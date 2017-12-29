import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import middlewares from '../middlewares'
import crypto from 'crypto'
import config from '../config'

export default async router => {
  router
    .post('/api/user/register', register)
    .get('/api/user', middlewares.verifyToken, getUserinfo)
    .post('/api/user/login', login)
    .patch('/api/user', middlewares.verifyToken, updateUserinfo)
}

/**
 * 注册账户
 * @method register
 * @param { * } ctx.request.body.username 用户名
 * @param { * } ctx.request.body.password 密码
 * @param { * } ctx.request.body.passwordrepeat 重复输入密码
 */
let register = async (ctx, next) => {
  let body = ctx.request.body
  if (body && body.username && body.password && body.passwordrepeat) {
    const username = body.username
    const password = body.password
    const passwordrepeat = body.passwordrepeat
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
        password: crypto.createHash('md5').update(password).digest('hex')
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
        username: res.username,
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
        avatar: user.avatar,
        tags: user.tags
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
 * 修改用户信息
 * 可供修改的只有用户昵称以及用户头像
 */
let updateUserinfo = async (ctx, next) => {
  // 验证是否为允许修改的字段
  let allowModify = ['nickname', 'avatar']
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
