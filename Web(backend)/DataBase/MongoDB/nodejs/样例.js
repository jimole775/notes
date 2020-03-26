const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // 数据服务器地址
const dbName = 'myproject' // 库名
const client = new MongoClient({ useUnifiedTopology: true }) // 创建实例
// 连接服务器
client.connect(url, function(err) {
  assert.equal(null, err) // 用断言进行判断
  const db = client.db(dbName) // 打开库  
  insertDocuments(db) // 插入逻辑
  client.close() // 关闭
})

const insertDocuments = function(db, callback) {
  const collection = db.collection('documents') // 打开表（文档）
  // 插入数据
  collection.insertMany([
    { a: 1 }, { a: 2 }, { a: 3 }
  ], function(err, result) {
    assert.equal(err, null)
    assert.equal(3, result.result.n)
    assert.equal(3, result.ops.length)
    callback && callback(result)
  })
}

// 更新表（文档）数据
const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents')
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }, { $set: { b : 1 } }, 
    function(err, result) {
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log("Updated the document with the field a equal to 2")
      callback && callback(result)
  })
}

// 删除表（文档）数据
const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents')
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log("Removed the document with the field a equal to 3")
    callback(result)
  }) 
}