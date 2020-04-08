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
   console.log("调研upMes")
   const db = cloud.database()
   var {headimg,nickName,name,phoneNumber}=event
   var openid=wxContext.OPENID

   await db.collection('user').where({
     openid:openid
   }).get({}).then(res=>{
     console.log("hehe",res)
     if(res.data.length==0){
      await db.collection("user").add({
        data:{
        openid:openid,
        headimg:headimg,
        nickName:nickName,
        name:name,
        phoneNumber:phoneNumber
        }
      }).then(res=>{
        console.log("success",res)
      })
     }
   })

}