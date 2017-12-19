import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import convert from 'koa-convert'
import serve from 'koa-static'
import cors from 'koa-cors'
import path from 'path'
import mongoose from 'mongoose'

import router from './router'

import config from 'config'

const app = new Koa()

app.listen(3000)