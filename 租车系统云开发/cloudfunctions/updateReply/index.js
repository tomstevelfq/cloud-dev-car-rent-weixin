// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _=db.command
  var child=event.child
  var comId=event.comId
  await db.collection("comment").where({
    _id:comId
  }).update({
    data:{
      child:_.push(child)
    }
  })
}