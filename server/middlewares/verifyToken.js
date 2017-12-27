import jwt from 'jsonwebtoken'

/**
 * @param {*} ctx
 * @param {*} next
 * token 验证
 * 从headers中的Authorization获取token
 * 如果没有 抛出错误
 * 将token根据cert秘钥解析
 * 如果解析错误 抛出错误
 * 成功则返回
 */

export default async function (ctx, next) {
  const authorization = ctx.get('Authorization')
  if (!authorization) ctx.throw(401, `no token detected in http header 'Authorization'`)
  const token = authorization.split(' ')[1]
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, ctx.config.jwt.cert)
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      ctx.throw(401, 'token expried')
    }
    ctx.throw(401, 'invalid token')
  }
  ctx.token = tokenContent
  await next()
}
