// miniprogram/pages/carManager/carManager.js
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
  rlist:null,
  name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  search:function(e){
    this.setData({
      name:e.detail.value
    })
  },

  staSear:function(e){
    var list=this.data.list
    var lis=[]
    var name=this.data.name
    for(let item of list){
      if(item.title.indexOf(name)>=0){
        lis.push(item)
      }
    }
    this.setData({
      rlist:lis
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
    var that=this
    wx.cloud.callFunction({
      name:"login",
      complete:function(e){
        var openid=e.result.openid
        const db=wx.cloud.database()

        db.collection("product").where({
          _openid:openid
        }).get({
          success:function(e){
            console.log(e)
            that.setData({
              list:e.data,
              rlist:e.data
            })
          }
        })
      }
    })
  },

  upCar:function(){
    wx.navigateTo({
      url: '/pages/uploadCar/uploadCar',
    })
  },

  del:function(e){
    console.log(e.currentTarget.id)
    var lis=this.data.rlist
    var id=lis[e.currentTarget.id]._id
    lis.splice(e.currentTarget.id,1)
    this.setData({
      rlist:lis,
    })
    var list=this.data.list
    var flag=0
    for(let item of list){
      if(item._id==id){
        list.splice(flag,1)
        break
      }
      flag+=1
    }
    console.log("id",id)
    
    wx.cloud.callFunction({
      name:"delPro",
      data:{
        id:id
      },
      complete:function(e){
        console.log("delsuc",e)
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
    const db=wx.cloud.database()
    var id=this.data.list[e.currentTarget.id]._id
    db.collection("product").where({
      _id:id
    }).get({
      success:function(e){
        app.globalData.product=e.data[0]
        wx.navigateTo({
          url: '/pages/product/product',
        })
      }
    })
  }
})