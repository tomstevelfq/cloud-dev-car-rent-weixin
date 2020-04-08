// miniprogram/pages/mine/mine.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    isShop:false,
    canReg:false,
    regi:false
  },

  userMes:function(){
    wx.navigateTo({
      url: '/pages/upMes/upMes',
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
    const db=wx.cloud.database()
        db.collection("shop").where({
          _openid:app.globalData.openid
        }).get({
          success:function(e){
            if(e.data.length==0){
              that.setData({
                isShop:false,
                canReg:true
              })
            }else{
              that.setData({
                isShop:true,
                canReg:false
              })
            }
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

  },
  getUserInfo: function (e) {
    if(e.detail.userInfo){
      app.globalData.userInfo=e.detail.userInfo
      this.setData({
        hasUserInfo: true,
        userInfo: e.detail.userInfo,
        regi:true
      })
    }
  },

  comment:function(e){
    wx.navigateTo({
      url: '/pages/proComment/proComment',
    })
  },

  collect:function(){
    wx.navigateTo({
      url: '/pages/myCollect/myCollect',
    })
  },

  myPost:function(){
    wx.navigateTo({
      url: '/pages/mypost/mypost',
    })
  },

  shop:function(){
    wx.navigateTo({
      url: '/pages/shopManager/shopManager',
    })
  },
  reShop:function(){
    console.log("reshop")
    wx.navigateTo({
      url: '/pages/reShop/reShop',
    })
  }
})