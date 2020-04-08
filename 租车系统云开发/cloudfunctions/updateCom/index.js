// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var com=event.com
  console.log("com",com)
  const db = cloud.database()
  const _=db.command
  var cid=com.id
  await db.collection("postComment").where({
    _id: cid
  }).update({
    data:{
      child:_.push(com)
    }
  })
}