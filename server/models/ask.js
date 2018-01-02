/**
 * 配对请求 用以存储请求配对信息
 * 配对情况需经过双方同意才可成功
 * @param { String } state 配对状态 confirm 确认中 accept 接受 reject 拒绝
 * @param { Object } sender 请求发送者
 * @param { Object } target 请求接收者
 */

import mongoose from 'mongoose'

const askSchema = new mongoose.Schema({
  state: {
    type: String,
    default: 'confirm'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('ask', askSchema)
