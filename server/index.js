import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import path from 'path'

import router from './router'

const app = new Koa()

app.use(router.routes())
   .use(router.allowedMethods())

app.listen(3000)