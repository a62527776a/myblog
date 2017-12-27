import initArticle from './article'
import initUser from './user'

export default router => {
  initArticle(router)
  initUser(router)
}
