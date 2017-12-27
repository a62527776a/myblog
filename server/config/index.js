export default {
  'jwt': {
    /**
     * @param { String } cert 用于生成token的密钥
     * token的构成 http://www.jianshu.com/p/576dbf44b2ae
     * 该属性为服务器私有的密钥
     */
    'cert': 'chenyu0577'
  },
  'mongoConfig': {
    // 数据库名 admin
    // 需要前往mongo创建用户
    url: 'mongodb://localhost:27017/admin',
    otps: {
      user: 'admin',
      pass: 'chenyu0577',
      useMongoClient: true
    }
  }
}
