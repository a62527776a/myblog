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
    .get('api/msgboard', middlewares.verifyToken, findMsgBorad)
}

/**
 * 获取留言板信息 配对对象从user信息中取
 */
let findMsgBorad = async (ctx, next) => {
  let user = await User
  .findOne({
    _id: ctx.token.uid
  }).exec().catch((e) => {console.log(e)})
  // 无配对用户 无法使用留言功能
  if (!user.loved) {
    ctx.body = {
      code: 60101,
      msg: middlewares.errCode[60101]
    }
    return
  }
}