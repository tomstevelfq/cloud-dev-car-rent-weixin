// miniprogram/pages/bonus/bonus.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    bonus:0,
    img:null
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
    this.setData({
      img:app.globalData.userInfo.avatarUrl
    })

    console.log("--",app.globalData.userInfo.avatarUrl)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    var openid=app.globalData.openid
    const db=wx.cloud.database()
    db.collection("product").where({
      _openid:openid,
      isBuy:true
    }).get().then(res=>{
      that.setData({
        list:res.data
      })
      var bonus=that.data.bonus
      for(let item of res.data){
        bonus+=parseInt(item.price)
      }
      that.setData({
        bonus:bonus
      })
    })
  },

  del:function(e){
    var id=e.currentTarget.id
    var colId=this.data.list[id]._id
    var lis=this.data.list
    lis.splice(id,1)
    this.setData({
      list:lis
    })

    wx.cloud.callFunction({
      name:"delCollect",
      data:{
        id:colId
      },
      complete:function(e){
        console.log("del",e)
      }
    })
  },

  product:function(e){
    console.log("product",this.data.list)
    var proId=this.data.list[e.currentTarget.id].proId
    const db=wx.cloud.database()
    db.collection("product").where({
      _id:proId
    }).get().then(res=>{
      app.globalData.product=res.data[0]
      console.log(app.globalData.product)
      wx.navigateTo({
        url: '/pages/product/product',
      })
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