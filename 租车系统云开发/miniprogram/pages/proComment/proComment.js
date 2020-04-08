// miniprogram/pages/proComment/proComment.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reply:null
  },

  tapComment:function(e){
    var proId=this.data.reply[e.currentTarget.id].proId
    wx.cloud.callFunction({
      name:"login",
      complete:function(e){
        var openid=e.result.userInfo.openId
        const db=wx.cloud.database()
        db.collection("product").where({
          _id:proId
        }).get().then(res=>{
          app.globalData.product=res.data[0]
          console.log("producta",app.globalData.product)
          wx.navigateTo({
            url: '/pages/product/product',
          })
        })
      }
    })
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
    var that=this
    wx.cloud.callFunction({
      name:"login",
      complete:function(e){
        var openid=e.result.userInfo.openId
        const db=wx.cloud.database()
        db.collection("comment").where({
          _openid:openid
        }).get().then(res=>{
          console.log("getcomment",res)
          that.setData({
            reply:res.data
          })
        })
      }
    })
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

  }
})