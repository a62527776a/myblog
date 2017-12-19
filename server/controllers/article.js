/**
 * 传入的是一个koa-router对象
 * @param router
 */
export default (router) => {
  router
    .get('/articles')
    .post('/articles')
    .patch('/articles/:id')
    .delete('/articles/:id')
}