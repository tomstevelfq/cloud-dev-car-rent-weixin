// miniprogram/pages/upMes/upMes.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    phoneNumber:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },

  phoneNumber:function(e){
    this.setData({
      phoneNumber:e.detail.value
    })
  },

  upMes:function(){
    var that=this
    var userInfo=app.globalData.userInfo
    const db=wx.cloud.database()
    var name=that.data.name
    var phoneNumber=that.data.phoneNumber


    wx.cloud.callFunction({
      name:"login",
      complete:function(e){
        var openid=e.result.openid
        var userInfo=app.globalData.userInfo
        console.log(userInfo,userInfo)
        var headimg=userInfo.avatarUrl
        var nickName=userInfo.nickName
        const db=wx.cloud.database()

        wx.cloud.callFunction({
          name:"delete",
          data:{
            openid:openid
          },
          success:function(e){
            console.log("succe")
            db.collection("user").add({
              data:{
              name:name,
              phoneNumber:phoneNumber,
              headimg:headimg,
              nickName:nickName
              },
              success:function(e){
                console.log("dsf",e)
                wx.switchTab({
                  url: '/pages/mine/mine',
                })
              }
            })
          }
        })

      }
    })

  },
})