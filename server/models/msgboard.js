/**
 * @param { String } content 留言内容 私密信息 仅配对对象可见 后期迭代为可添加音频或视屏
 * @param { Boolean } type 留言属性 是好话还是赖话 是对你喜欢的话还是讨厌你的话 为空则为平淡的话
 * @param { Object } user 发布人的用户信息
 * @param { Object } target 发布人的配对对象信息
 */

import mongoose from 'mongoose'

const msgboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('msgboard', msgboardSchema)
