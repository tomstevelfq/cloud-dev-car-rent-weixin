// miniprogram/pages/reShop/reShop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    addr:"",
    phone:"",
    intro:"",
    time:""
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

  btn:function(){
    var name=this.data.name
    var addr=this.data.addr
    var intro=this.data.intro
    var time=this.data.time
    var phone=this.data.phone
    wx.cloud.callFunction({
      name:"login",
      complete:function(e){
        var openid=e.result.openid
        const db=wx.cloud.database()
        console.log(openid)
        db.collection("shop").where({
          _openid:openid
        }).get({
          success:function(e){
            console.log(e)
            if(e.data.length==0){
              db.collection("shop").add({
                data:{
                  name:name,
                  addr:addr,
                  intro:intro,
                  time:time,
                  phone:phone
                },
                success:function(e){
                  console.log(e)
                  wx.showToast({
                    title: '上传成功',
                    icon:"success",
                    duration:200,
                    success:function(){
                      wx.switchTab({
                        url: '/pages/mine/mine',
                      })
                    }
                  })
                
                }
              })
            }
          }
        })
      }
    })
  },

  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },

  addr:function(e){
    this.setData({
      addr:e.detail.value
    })
  },

  phone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  intro:function(e){
    this.setData({
      intro:e.detail.value
    })
  },

  time:function(e){
    this.setData({
      time:e.detail.value
    })
  }
})