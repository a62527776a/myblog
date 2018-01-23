/**
 * article 用户文章
 * 每发布一篇文章需要附带tag 无tag无法发布
 * 封面需要单独上传
 */

import Article from '../models/article.js'
import User from '../models/user.js'
import middlewares from '../middlewares'
import config from '../config'

/**
 * 传入的是一个koa-router对象
 * @param router
 */
export default (router) => {
  router
    .get('/api/articles', findArticles)
    .post('/api/articles', middlewares.verifyToken, postArticle)
    .patch('/api/articles/:id', middlewares.verifyToken, deleteArticle)
    .delete('/api/articles/:id', middlewares.verifyToken, findArticleById)
}

/**
 * @param { ObjectId } author 作者
 * @param { Array } tags 标签
 */
let findArticles = async (ctx, next) => {
  const limit = ~~ctx.query.limit || 10
  const page = ~~ctx.query.page || 1
  const skip = limit * (page - 1)
  const author = ctx.query.author || null
  const tags = ctx.query.tags || null
  const findOpt = {}
  if (author) findOpt.author = author
  if (tags) findOpt.tags = tags
  let totalnum = await Article
    .find()
    .count()
    .exec().catch( e => { console.log(e) })
  await Article
    .find(findOpt)
    .populate({path: 'author', select: '_id nickname gender avatar'})
    .sort({createTime: -1})
    .limit(limit)
    .select('_id title author createTime tags cover')
    .skip(skip)
    .then(articles => {
      ctx.body = {
        articles,
        totalnum
      }
    })
    .catch(e => {
      console.log( e )
    })
}

/**
 * @method postArticle
 * @param { Object } 上传的文章字段
 * 必须提交标题 内容 以及标签 作者根据token生成
 * content为markdown格式
 * 文章封面以及图片另外上传
 */
let postArticle = async (ctx, next) => {
  // 检查文章必须的字段  
  const required = ['title', 'content', 'tags']
  try {
    if (typeof ctx.request.body.tags !== 'object') throw (new Error())
    required.forEach(val => {
      if (!ctx.request.body[val]) throw (new Error(`necessary have field ${val}`))
    })
  } catch (e) {
    ctx.body = {
      code: 50101,
      msg: middlewares.errCode[50101]
    }
    return
  }
  // 验证title长度 为1到20个字
  if (!/^.{2,6}$/.test(ctx.request.body.title)) {
    ctx.body = {
      code: 50102,
      msg: middlewares.errCode[50102]
    }
    return
  }
  ctx.request.body.author = ctx.token.uid
  const article = new Article(ctx.request.body)
  await article.save()
    .then(() => {
      ctx.body = {
        code: 200
      }
    }).catch(e => {
      console.log(e)
      ctx.body = {
        code: 20101,
        msg: middlewares.errCode[20101]
      }
    }) 
}
