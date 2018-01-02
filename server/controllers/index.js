import initArticle from './article'
import initUser from './user'
import initTag from './tag'
import initMsgboard from './msgboard'

export default router => {
  initArticle(router)
  initUser(router)
  initTag(router)
  initMsgboard(router)
}
