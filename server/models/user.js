import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nickname: String,
  username: String,
  password: String,
  avatar: String,
  createTime: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('user', userSchema)
