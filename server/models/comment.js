import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  // 楼层数 前端根据楼层数获取username
  replyTo: Number,
  createTime: {
    type: Date,
    default: Date.now()
  }
})
