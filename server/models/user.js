/**
 * @param { String } avatar 用户头像 以base64格式存储
 * @param { Array } tags 用户文章标签 默认为无 由用户初始化
 * @param { String } gender 用户性别 male 男 female 女 理念是对方性别可男可女
 * @param { Object } loved 配对用户 默认为 null 登录后修改 对象为另一个用户 未设置性别不可设置配对用户
 */

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nickname: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // 用户头像以base64的格式储存
  avatar: {
    type: String
  },
  tags: {
    type: Array,
    default: []
  },
  gender: {
    type: String,
    required: true
  },
  loved: {
    type: mongoose.Schema.Types.ObjectId,
    // 关联关系
    ref: 'user'
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('user', userSchema)
