import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'koa2-cors'

import router from './router'
import config from './config'

const app = new Koa()

/**
 * mongoose Promise 为非标准的Promise对象
 * 未来版本将替换为ES6Promise
 * 推荐将mongoosePromise替换为ES6 Promise
 */
mongoose.Promise = global.Promise

mongoose.connect(config.mongoConfig.url, config.mongoConfig.otps)
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'))

app.use(cors({
  origin: '*',
  // http请求缓存时间
  maxAge: 5,
  credentials: true
}))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
