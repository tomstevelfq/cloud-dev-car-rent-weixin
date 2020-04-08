// miniprogram/pages/myCollect/myCollect.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null
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
        db.collection("collect").where({
          _openid:openid
        }).get({
          success:function(e){
            console.log(e.data)
            that.setData({
              list:e.data
            })
          }
        })
      }
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