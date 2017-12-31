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
    .patch('/api/articles/:id')
    .delete('/api/articles/:id', findArticleById)
}

let findArticles = async (ctx, next) => {
  await Article
    .find()
    .then(articles => {

    })
    .catch(e => {

    })
}

let findArticleById = async (ctx, next) => {

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
  let user = await User.findById({_id: ctx.token._id})
    .exec().catch(e => { console.log(e) })

  ctx.body = {
    code: 200,
    msg: '666'
  }
  await next()
}
