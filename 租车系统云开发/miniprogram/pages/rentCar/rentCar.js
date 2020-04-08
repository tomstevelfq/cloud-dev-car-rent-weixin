// miniprogram/pages/rentCar/rentCar.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bnrUrl: [{
      "url": "../images/car.jpg"
    }, {
        "url": "../images/car.jpg"
    }, {
        "url": "../images/car.jpg"
    }, {
        "url": "../images/car.jpg"
    }],
    list:null,
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
    const db = wx.cloud.database()
    db.collection("product").get({
      success:function(e){
        console.log("pros",e)
        that.setData({
          list:e.data
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

  },

  product:function(e){
    app.globalData.product=this.data.list[e.currentTarget.id]
    console.log("pdu",app.globalData.product)
    wx.navigateTo({
      url: '/pages/product/product',
    })
  },
  con:function(){
    console.log(app.globalData.userInfo,app.globalData.openid)
  }
})

