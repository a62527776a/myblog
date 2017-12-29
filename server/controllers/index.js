import initArticle from './article'
import initUser from './user'
import initTag from './tag'

export default router => {
  initArticle(router)
  initUser(router)
  initTag(router)
}
