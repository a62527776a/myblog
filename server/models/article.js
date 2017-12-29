/**
 * @param { String } title 文章标题
 * @param { String } content 文章内容
 * @param { String } cover 文章封面 默认为空
 * @param { Object } author 文章作者
 * @param { Array } comments 文章评论 每一条为一个用户或者游客
 * @param { Array } tags 文章所属标签 可根据标签分类查询
 * @param { Number } visit 文章参观数量 根据点击次数增加
 * @param { Date } lastEditTime 文章最后编辑时间
 */

import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    // TODO: 若无封面 则前端赋默认封面
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // 关联关系
      ref: 'comment'
    }
  ],
  tags: {
    type: Array,
    required: true
  },
  visit: {
    type: Number,
    default: 0
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  lastEditTime: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('article', articleSchema)
