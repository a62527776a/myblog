/**
 * @method askPair 请求配对
 * 配对信息需要双方确认
 * 配对状态 confirm 确认中 accept
 */

import jwt from 'jsonwebtoken'
import User from '../models/user'
import Ask from '../models/ask'
import middlewares from '../middlewares'
import crypto from 'crypto'
import config from '../config'

export default async router => {
  router
    .post('/api/user/register', register)
    .get('/api/user', middlewares.verifyToken, getUserinfo)
    .post('/api/user/login', login)
    .patch('/api/user', middlewares.verifyToken, updateUserinfo)
    .post('/api/user/ask', middlewares.verifyToken, askPair)
    .patch('/api/user/ask', middlewares.verifyToken, resolvePair)
    .delete('/api/user/loved', middlewares.verifyToken, leave)
}

/**
 * 注册账户
 * @method register
 * @param { String } ctx.request.body.username 用户名
 * @param { String } ctx.request.body.password 密码
 * @param { String } ctx.request.body.passwordrepeat 重复输入密码
 * @param { String } ctx.request.body.gender 性别
 */
let register = async (ctx, next) => {
  let body = ctx.request.body
  if (body && body.username && body.password && body.passwordrepeat) {
    const username = body.username
    const password = body.password
    const passwordrepeat = body.passwordrepeat
    const gender = body.gender
    // 验证用户名格式6-12位a-zA-Z0-9组成
    if (!(/^[a-zA-Z0-9]{6,12}$/).test(username)) {
      ctx.body = {
        code: 10102,
        msg: middlewares.errCode[10102]
      }
      return
    }
    // 验证密码格式6-20位a-zA-Z0-9组成
    if (!(/^[a-zA-Z0-9]{6,20}$/).test(password)) {
      ctx.body = {
        code: 10103,
        msg: middlewares.errCode[10103]
      }
      return
    }
    // 验证重复输入密码
    if (password !== passwordrepeat) {
      ctx.body = {
        code: 10105,
        msg: middlewares.errCode[10105]
      }
      return
    }
    // gender 性别 male 男 female 女
    if ((gender !== 'male' && gender !== 'female')) {
      ctx.body = {
        code: 10114,
        msg: middlewares.errCode[10114]
      }
      return
    }
    /**
     * exec() 将findOne查询的结果返回Promise对象
     */
    let user = await User
      .findOne({username})
      .exec()
      .catch(err => {
        throw new Error(err)
      })
    if (!user) {
      user = new User({
        nickname: username,
        username: username,
        password: crypto.createHash('md5').update(password).digest('hex'),
        gender: gender
      })
      await user.save()
        .then(val => {
          ctx.body = {
            code: 200
          }
        })
        .catch(err => {
          throw new Error(err)
        })
    } else {
      // 用户名已存在
      ctx.body = {
        code: 10201,
        msg: middlewares.errCode[10201]
      }
    }
  } else {
    // 字段不全
    ctx.body = {
      code: 10101,
      msg: middlewares.errCode[10101]
    }
  }
  await next()
}

/**
 * @method login
 * @param { String } ctx.request.body.username 用户名
 * @param { String } ctx.request.body.password 密码
 * 用户登录
 */
let login = async (ctx, next) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  if (!username || !password) {
    ctx.body = {
      code: 10106,
      msg: middlewares.errCode[10106]
    }
    return
  }
  const md5Pwd = crypto.createHash('md5').update(password).digest('hex')
  await User.findOne({username})
    .then(res => {
      // 无返回或者返回的用户密码与请求的密码不匹配
      if (!res || (res && res.password !== md5Pwd)) {
        ctx.body = {
          code: 10202,
          msg: middlewares.errCode[10202]
        }
        return
      }
      const token = jwt.sign({
        uid: res._id,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
      }, config.jwt.cert)
      ctx.body = {
        code: 200,
        data: token
      }
    }).catch(e => {
      ctx.body = {
        code: 20101,
        msg: middlewares.errCode[20101]
      }
    })
  await next()
}

/**
 * 根据token是否过期以及token信息来获取用户信息
 * 该函数需要执行验证token的函数
 */
let getUserinfo = async (ctx, next) => {
  await User.findOne({
    username: ctx.token.username
  }).then(user => {
    ctx.body = {
      code: 200,
      data: {
        nickname: user.nickname,
        username: user.username,
        tags: user.tags,
        gender: user.gender,
        avatar: user && user.avatar,
        loved: user && user.loved
      }
    }
  }).catch(e => {
    ctx.body = {
      code: 20101,
      msg: middlewares.errCode[20101]
    }
  })
}

/**
 * @method updateUserinfo
 * @param { String } ctx.request.body.nickname 用户昵称
 * @param { String } ctx.request.body.avatar 用户头像 base64格式
 * @param { String } ctx.request.body.gender 用户性别 male 男 female 女
 * 修改用户信息
 * 可供修改的有用户昵称 用户头像 用户性别
 */
let updateUserinfo = async (ctx, next) => {
  // 验证是否为允许修改的字段
  let allowModify = ['nickname', 'avatar', 'gender', 'loved']
  for (let i in ctx.request.body) {
    if (!allowModify.includes(i)) {
      ctx.body = {
        code: 10107,
        msg: middlewares.errCode[10107]
      }
      return
    }
  }
  // 验证昵称 仅可2-12个字符
  if (ctx.request.body.nickname && !/^.{2,12}$/.test(ctx.request.body.nickname)) {
    ctx.body = {
      code: 10108,
      msg: middlewares.errCode[10108]
    }
    return
  }
  // 验证头像 仅为base64格式
  // TODO: 对base64大小进行限制
  // 前端做好图片裁切
  if (ctx.request.body.avatar && !/^[A-Za-z\d+/]{214}([A-Za-z\d+/][A-Za-z\d+/=]|==)$/.test(ctx.request.body.avatar)) {
    ctx.body = {
      code: 10109,
      msg: middlewares.errCode[10109]
    }
    return
  }
  // 用户性别验证
  if (ctx.request.body.gender && ctx.request.body.gender !== 'male' && ctx.request.body.gender !== 'female') {
    ctx.body = {
      code: 40102,
      msg: middlewares.errCode[40102]
    }
    return
  }
  await User.findByIdAndUpdate(
    {
      _id: ctx.token.uid
    },
    ctx.request.body
  ).then(user => {
    ctx.body = {
      code: 200
    }
  }).catch(e => {
    ctx.body = {
      code: 20101,
      msg: middlewares.errCode[20101]
    }
  })
  await next()
}

/**
 * @method askPair 请求配对，配对信息需要双方确认 确认后才可成为情侣 记录双方关系
 * 有配对用户的无法发起请求
 * @param { String } target 目标配对用户ID
 */
let askPair = async (ctx, next) => {
  let ask = await Ask.findOne({
    sender: ctx.token.uid
  }).exec().catch(e => { console.log(e) })
  // 发过配对请求未被拒绝且未过期时 无法再次发送
  if (ask && ask.state === 'confirm') {
    let timeout = new Date() - new Date(ask.createTime)
    // 超时时间 3天
    if ((timeout / 1000 / 60 / 60 / 24) < 3) {
      ctx.body = {
        code: 10118,
        msg: middlewares.errCode[10118]
      }
      return
    }
  }
  // 配对用户不能为自己
  if (ctx.request.body.target === ctx.token.uid) {
    ctx.body = {
      code: 10117,
      msg: middlewares.errCode[10117]
    }
    return
  }
  // 检查自己是否有配对用户
  let user = await User.findOne({
    _id: ctx.token.uid
  }).exec().catch(e => {console.log(e)})
  if (user.loved) {
    ctx.body = {
      code: 10116,
      msg: middlewares.errCode[10116]
    }
    return
  }
  // 检查目标用户是否存在
  let targetUser = await User.findOne({
    _id: ctx.request.body.target
  }).exec().catch(e => {console.log(e)})
  if (!targetUser) {
    ctx.body = {
      code: 10119,
      msg: middlewares.errCode[10119]
    }
    return
  }
  if (targetUser.loved) {
    ctx.body = {
      code: 10120,
      msg: middlewares.errCode[10120]
    }
    return
  }
  ask = new Ask({
    state: 'confirm',
    sender: ctx.token.uid,
    target: ctx.request.body.target
  })
  // 请求已发出 发出后禁止重复发送
  await ask.save().then(ask => {
    ctx.body = {
      code: 200
    }
  }).catch(e => { console.log(e) })
}

/**
 * @method resolvePair 回复配对，接受或拒绝 超过3天算拒绝
 * @param { String } id 配对信息ID
 * @param { String } state accept 接受 reject 拒绝
 */
let resolvePair = async (ctx, next) => {
  // 处理错误请求
  let ask = await Ask.findOne({
    _id: ctx.request.body.id
  }).exec().catch(e => { console.log(e) })
  if (!ask || (ctx.request.body.state !== 'accept' && ctx.request.body.state !== 'reject')) {
    ctx.body = {
      code: 40102,
      msg: middlewares.errCode[40102]
    }
    return
  }
  // 拒绝则直接修改状态
  if (ctx.request.body.state === 'reject') {
    await Ask.findByIdAndUpdate({
      _id: ctx.request.body.id
    }, {
      state: ctx.request.body.state
    }).then(() => {
      ctx.body = {
        code: 200
      }
    }).catch(e => { console.log(e) })
    return
  }
  // 配对请求是否超时
  if ((((new Date() - new Date(ask.createTime)) / 1000 / 60 / 60 / 24) > 3)) {
    ctx.body = {
      code: 10121,
      msg: middlewares.errCode[10121]
    }
    return
  }
  let user = await User.findOne({
    _id: ctx.token.uid
  }).exec().catch(e => { console.log(e) })
  // 如果用户已有配对用户 禁止接受配对
  if (user.loved) {
    ctx.body = {
      code: 10116,
      msg: middlewares.errCode[10116]
    }
    return
  }
  let senderUser = await User.findOne({
    _id: ask.sender
  }).exec().catch(e => { console.log(e) })
  // 如果发送者有配对用户 返回错误信息
  if (senderUser.loved) {
    ctx.body = {
      code: 10120,
      msg: middlewares.errCode[10120]
    }
    return
  }
  // 修改请求配对信息状态为接受并修正双方配对用户信息
  await Ask.findByIdAndUpdate({
    _id: ctx.request.body.id
  }, {
    state: ctx.request.body.state
  }).then(async () => {
    Promise.all([
      // 修改发送者loved
      await User.findByIdAndUpdate({
        _id: ask.sender
      }, {
        loved: ask.target
      }).exec().catch(e => { console.log(e) })
    ,
      // 修改接收者loved
      await User.findByIdAndUpdate({
          _id: ask.target
        }, {
          loved: ask.sender
        }).exec().catch(e => { console.log(e) })
      ]).then(res => {
        ctx.body = {
          code: 200
        }
    }).catch(e => { console.log(e) })
  })
}

/**
 * @method leave 离开 解除配对关系 将双方配对关系解除 单方解除则双方解除
 */
let leave = async (ctx, next) => {
  let user = await User.findOne({
    _id: ctx.token.uid
  }).exec().catch( e => console.log(e) )
  // 边界检查
  console.log(user)
  if (!user.loved) {
    ctx.body = {
      code: 10122,
      msg: middlewares.errCode[10122]
    }
    return
  }
  let loved = await User.findOne({
    _id: user.loved
  }).exec().catch( e => console.log(e) )
  if (loved.loved !== ctx.token.uid || user.loved !== loved._id.toString()) {
    ctx.body = {
      code: 40102,
      msg: middlewares.errCode[40102]
    }
  }
  await User.update({
    '$or': [{
      _id: user.loved
    }, {
      _id: ctx.token.uid
    }]
  }, {
    loved: ''
  }, {multi: true}).exec().catch( e => console.log(e) )
  ctx.body = {
    code: 200
  }
}