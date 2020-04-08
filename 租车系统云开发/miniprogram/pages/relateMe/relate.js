// miniprogram/pages/relateMe/relate.js
import regeneratorRuntime from '../../lib/runtime.js'
var list=[]
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reply:null,
    list:["1","23"],
    content:"",
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

  inreply:function(e){
    this.setData({
      content:e.detail.value
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

  async getMes(){
    const db=wx.cloud.database()
    var openid=app.globalData.openid
    await db.collection("product").where({
      _openid:openid
    }).get().then(res=>{
      var lis=res.data
      for(let item of lis){
        var proId=item._id
        this.addLis(proId)
      }
    })

    console.log("吃炸鸡",list)
  },

  async addLis(proId){
    const db=wx.cloud.database()
    await db.collection("comment").where({
      proId:proId
    }).get().then(res=>{
      for(let i of res.data){
        list.push(i)
      }
    })
  },

  reply:function(e){
    var comId=e.currentTarget.id
    var child={
      content:this.data.content,
      headimg:app.globalData.userInfo.avatarUrl,
      nickName:app.globalData.userInfo.nickName
    }
    wx.cloud.callFunction({
      name:"updateReply",
      data:{
        child:child,
        comId:comId
      },
      complete:function(e){
        console.log("update成功")
      }
    })
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

    this.getMes()
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