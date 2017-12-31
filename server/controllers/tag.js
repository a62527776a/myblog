/**
 * tag 用户发布文章时需要附上的tag
 * 标签最大为8个
 * tags从USER表下查询
 */

import User from '../models/user.js'
import middlewares from '../middlewares'

export default (router) => {
  router
    .post('/api/tag', middlewares.verifyToken, createTag)
    .delete('/api/tag', middlewares.verifyToken, deleteTag)
    .patch('/api/tag', middlewares.verifyToken, modifyTag)
}

/**
 * @param { String } ctx.request.body.tag 被增加的tag名字
 */
let createTag = async (ctx, next) => {
  // 标签仅为2到6个字符
  if (!ctx.request.body.tag) {
    ctx.body = {
      code: 10111,
      msg: middlewares.errCode[10111]
    }
    return
  }
  if (!/^.{2,6}$/.test(ctx.request.body.tag)) {
    ctx.body = {
      code: 10110,
      msg: middlewares.errCode[10110]
    }
    return
  }
  // await 等待该操作结束执行下一步
  let user = await User.findOne({
    _id: ctx.token.uid
  }).exec().catch(e => { console.log(e) })
  // 标签名最多8个
  if (user.tags.length === 8) {
    ctx.body = {
      code: 10113,
      msg: middlewares.errCode[10113]
    }
    return
  }
  // 检测是否有重复标签，重复则return
  if (user.tags.includes(ctx.request.body.tag)) {
    ctx.body = {
      code: 10112,
      msg: middlewares.errCode[10112]
    }
    return
  }
  await User.findOneAndUpdate({
    _id: ctx.token.uid
  }, {
    $addToSet: {
      tags: ctx.request.body.tag
    }
  }).then(user => {
    ctx.body = {
      code: 200
    }
  }).catch(e => {
    console.log(e)
  })
}

/**
 * @param { String } ctx.request.body.tag 被删除的tag名字
 */
let deleteTag = async (ctx, next) => {
  await User.findOneAndUpdate({
    _id: ctx.token.uid
  }, {
    // 前端拦截 根据userinfo来处理 如果userinfo中tags为空 则阻止
    $pull: {
      tags: ctx.request.body.tag
    },
    new: true
  }).then(user => {
    ctx.body = {
      code: 200
    }
  }).catch(e => {
    console.log(e)
  })
}

/**
 * @method modifyTag
 * @param { Array } ctx.body.tags 所有标签 前端传修改后的所有标签 而非被修改的那个标签
 * ['tag1', 'tag2', 'tag3'] => ['tag1', 'tag4', 'tag3']
 */
let modifyTag = async (ctx, next) => {
  // 验证tag名是否为空以及是否为2-6个字符
  let hasEmpty = ctx.request.body.tags.every(val => {
    return (/^.{2,6}$/.test(val) && val !== '')
  })
  if (!hasEmpty) {
    ctx.body = {
      code: 10110,
      msg: middlewares.errCode[10110]
    }
    return
  }
  // 当tags数量为0或大于8个时 则为错误情况
  if (ctx.request.body.tags.length === 0 || ctx.request.body.tags.length > 8) {
    ctx.body = {
      code: 40101,
      msg: middlewares.errCode[40101]
    }
    return
  }
  // 根据Set无重复属性的特性来判断修改的标签是否重复
  let set = new Set()
  ctx.request.body.tags.forEach(val => {
    set.add(val)
  })
  // 当tags数量与set数量不相等时 则为有重复标签名
  if (set.size !== ctx.request.body.tags.length) {
    ctx.body = {
      code: 10112,
      msg: middlewares.errCode[10112]
    }
    return
  }
  await User.findOneAndUpdate({
    _id: ctx.token.uid
  }, {
    $set: {
      tags: ctx.request.body.tags
    }
  }, {
    new: true
  }).then(user => {
    ctx.body = {
      code: 200,
      msg: user
    }
  }).catch(e => {
    console.log(e)
  })
}
