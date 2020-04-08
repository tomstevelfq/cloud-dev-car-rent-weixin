// pages/mypost/mypost.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts:[],
    poLength:"  ",
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
        db.collection("post").where({
          _openid:openid
        }).get({
          success:function(e){
            that.setData({
              posts:e.data,
              poLength:e.data.length
            })
          }
        })
      }
    })
  
  },

  _display:function(e){
    app.globalData.post=this.data.posts[e.currentTarget.id]
    wx.navigateTo({
      url: 'postDisplay/postDisplay',
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