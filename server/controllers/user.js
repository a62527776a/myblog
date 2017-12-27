import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import middlewares from '../middlewares'

export default async router => {
  router
    .post('/api/user', register)
    // .get('/api/user', getUserinfo)
    // .patch('/api/user', updateUserinfo)
}

/**
 * @param { * } ctx
 * @param { * } next
 * 注册账户
 */
let register = async (ctx, next) => {
  let body = ctx.request.body
  if (body && body.username && body.password) {
    const username = body.username
    const password = body.password
    const passwordrepeat = body.passwordrepeat
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
    let user = await User.findOne({username}).exec()
    if (!user) {
      // TODO: 注册新用户
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
