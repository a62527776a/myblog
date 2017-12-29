import jwt from 'jsonwebtoken'
import config from '../config'
import errCode from './errCode'

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
  if (!authorization) {
    ctx.body = {
      code: 30101,
      msg: errCode[30101]
    }
    return
  }
  let tokenContent
  try {
    tokenContent = await jwt.verify(authorization, config.jwt.cert)
    ctx.token = tokenContent
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      ctx.body = {
        code: 30102,
        msg: errCode[30102]
      }
      return
    }
    ctx.body = {
      code: 30103,
      msg: errCode[30103]
    }
    return
  }
  await next()
}
