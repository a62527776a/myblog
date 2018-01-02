/**
 * msgboard 留言板 只允许有配对对象的用户使用 若无 一律无法使用
 * 留言时存入留言者配对用户的用户信息 如果更换配对用户 则不显示非当前配对用户的留言信息
 * 给每个配对用户留存单独显示的留言信息
 */

import MsgBoard from '../models/msgboard'
import User from '../models/user'
import middlewares from '../middlewares'

export default (router) => {
  router
    .get('/api/msgboard', middlewares.verifyToken, findMsgBoard)
    .post('/api/msgboard', middlewares.verifyToken, postMsgBoard)
}

/**
 * @method findMsgBoard 获取留言板信息
 * 根据user信息获取 只获取给当前配对用户的留言
 */
let findMsgBoard = async (ctx, next) => {
  let user = await User
    .findOne({
      _id: ctx.token.uid
    }, '_id nickname gender avatar loved').exec().catch((e) => { console.log(e) })
  // 无配对用户 无法使用留言功能
  if (!user.loved) {
    ctx.body = {
      code: 60101,
      msg: middlewares.errCode[60101]
    }
    return
  }
  const limit = ~~ctx.query.limit || 10
  const page = ~~ctx.query.page || 1
  const skip = limit * (page - 1)
  let msgboard = await MsgBoard
    .find({'$or': [
      // 查询符合两种情况的值 发送者当前用户 接收者配对用户 或 发送者配对用户 接收者配对用户
      {
        user: ctx.token.uid,
        target: user.loved
      },{
        user: user.loved,
        target: ctx.token.uid
      }
    ]})
      .sort({createTime: -1})
      .limit(limit)
      .skip(skip) // 跳过指定数量的数据
      .exec().catch(e => console.log(e))
  let totalnum = await MsgBoard
    .find()
    .count()
    .exec().catch(e => console.log(e))
  let targetUser = await User.findOne({
    _id: user.loved
  }, '_id nickname gender avatar').exec().catch(e => console.log(e))
  // 由于只有双方 所以不用根据每个信息的收发者查询数据库作者
  msgboard.forEach((item, idx) => {
    item.user === user._id ? item.user = user : item.user = targetUser
    item.target === user.id ? item.target = targetUser : item.target = user
  })
  ctx.body = {
    code: 200,
    data: {
      msgboard,
      totalnum
    }
  }
}

/**
 * @method postMsgBoard 发表留言
 * @param { String } content 留言内容
 * @param { Boolean } type 留言类型 true 开心的话 false 令人失望的话 无此字段即为无感情的话
 * 默认只能给留言对象发表
 */
let postMsgBoard = async (ctx, next) => {
  let user = await User
    .findOne({
      _id: ctx.token.uid
    }).exec().catch(e => { console.log(e) })
  // 如果没有配对对象，则无法留言
  if (!user.loved) {
    ctx.body = {
      code: 60101,
      msg: middlewares.errCode[60101]
    }
    return
  }
  // 留言最多300字
  if (ctx.request.body.content.length > 300) {
    ctx.body = {
      code: 60102,
      msg: middlewares.errCode[60102]
    }
    return
  }
  // 检查参数类型
  if (ctx.request.body.type && typeof ctx.request.body.type !== 'boolean') {
    ctx.body = {
      code: 40102,
      msg: middlewares.errCode[40102]
    }
    return
  }
  ctx.request.body.target = user.loved
  ctx.request.body.user = ctx.token.uid
  let msgboard = new MsgBoard(ctx.request.body)
  await msgboard.save()
    .then(() => {
      ctx.body = {
        code: 200
      }
    }).catch(e => console.log(e))
}