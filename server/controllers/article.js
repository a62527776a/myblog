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
    .patch('/api/articles', middlewares.verifyToken, patchArticle)
    .delete('/api/articles', middlewares.verifyToken, deleteArticle)
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
  const id = ctx.query.id || null
  const findOpt = {}
  if (author) findOpt.author = author
  if (tags) findOpt.tags = tags
  if (id) findOpt.id = id
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


/**
 * @param { String } title 
 * @param { String } content
 * @param { String } cover 封面
 * @param { Boolean } visit 该字段将增加浏览次数
 * @method patchArticle 修改文章内容 以及修改浏览次数
 */
let patchArticle = async (ctx, next) => {
  // 非法请求
  if (!ctx.request.body.id) return
  // 是否存在该文章
  let article = await Article.findById({
    _id: ctx.request.body.id
  }).exec().catch( e => console.log(e) )
  if (!article) {
    ctx.body = {
      code: 50104,
      msg: middlewares.errCode[50104]
    }
    return
  }
  // 验证title
  if (ctx.request.body.title && !/^.{2,6}$/.test(ctx.request.body.title)) {
    ctx.body = {
      code: 50102,
      msg: middlewares.errCode[50102]
    }
    return
  }
  // --------------------- 增加浏览次数部分 ----------------
  if (ctx.request.body.visit) {
    Article.update({
      _id: ctx.request.body.id
    }, {
      '$inc': {'visit': 1}
    }).exec().catch( e => { console.log(e) } )
    return
  }
  // --------------------- 编辑文章部分 --------------------
  // 检查是否有非法字段
  const allowModify = ['title', 'content', 'cover']
  try {
    for (let i in ctx.request.body) {
      // 不检查id字段
      if (i === 'id') break
      if (!allowModify.includes(i)) throw (new Error(`necessary have field ${val}`))
    }
  } catch (e) {
    ctx.body = {
      code: 50103,
      msg: middlewares.errCode[50103]
    }
    return
  }
  let id = ctx.request.body.id
  // 不更新id字段
  delete ctx.request.body.id
  // 更新最后编辑时间
  ctx.request.body.lastEditTime = new Date()
  await Article.findByIdAndUpdate({
    _id: id
  }, ctx.request.body).then(() => {
    ctx.body = {
      code: 200
    }
  }).catch( e => { console.log(e) })

}

let deleteArticle = async (ctx, next) => {

}