import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
  title: String,
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
