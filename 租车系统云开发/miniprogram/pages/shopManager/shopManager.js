// miniprogram/pages/shopManager/shopManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nshop:false,
    yshop:false,
    shopMes:null,
    headimg:null,
  },

  carMan:function(){
    wx.navigateTo({
      url: '/pages/carManager/carManager',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.cloud.callFunction({
      name:"login",
      complete:function(e){
        var openid=e.result.openid
        const db=wx.cloud.database()

        db.collection("shop").where({
          _openid:openid
        }).get({
          success:function(e){
            console.log("suc",e)
            if(e.data.length==0){
              that.setData({
                yshop:false,
                nshop:true,
              })
            }else{
              that.setData({
                nshop:false,
                yshop:true,
              })

              db.collection("shop").where({
                _openid:openid
              }).get({
                success:function(e){
                  that.setData({
                    shopMes:e.data[0]
                  })
                  console.log(e,that.data.shopMes)
                }
              })

              db.collection("user").where({
                _openid:openid
              }).get({
                success:function(e){
                  console.log(e)
                  that.setData({
                    headimg:e.data[0].headimg
                  })
                }
              })
            }
          }
        })
      }
    })
  
  },

  relate:function(){
    wx.navigateTo({
      url: '/pages/relateMe/relate',
    })
  },

  bonus:function(){
    wx.navigateTo({
      url: '/pages/bonus/bonus',
    })
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

  }
})