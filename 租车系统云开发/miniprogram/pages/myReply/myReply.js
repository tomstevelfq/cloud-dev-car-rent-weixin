// miniprogram/pages/myReply/myReply.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reply:null
  },

  tapComment:function(e){
    var postId=this.data.reply[e.currentTarget.id].postId
    const db = wx.cloud.database()
    db.collection("post").where({
      _id:postId
    }).get().then(res=>{
      app.globalData.post=res.data[0]
      wx.navigateTo({
        url: '/pages/mypost/postDisplay/postDisplay',
      })
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
        var openid=e.result.openid
        const db=wx.cloud.database()
        db.collection("reply").where({
          _openid:openid
        }).get().then(res=>{
          console.log("getreply",res)
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