/**
 * 传入的是一个koa-router对象
 * @param router
 */
export default (router) => {
  router
    .get('/articles', findArticles)
    .post('/articles')
    .patch('/articles/:id')
    .delete('/articles/:id')
}


let findArticles = async(ctx, next) => {
  ctx.status = 200
  ctx.body = {
    success: true,
    data: {
      title: '666'
    }
  }
  await next()
}

let findArticlesById = async(ctx, next) => {
  
}