// miniprogram/pages/product/product.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    shop: null,
    imgs: [],
    shopUser: null,
    len: null,
    index: 1,
    content: '',
    focus: false,
    comments: [],
    collectimg: "../images/collectPro.png",
    colnum: "",
    comnum: "",
    isBuy: false,
    canBuy: false
  },


  contentInput(e) { //当输入框的值发生改变时，获取
    this.setData({
      content: e.detail.value
    });
  },

  collect: function () {
    var that=this
    if (this.data.collectimg == "../images/scc.png") {
      wx.showToast({
        title: '已收藏',
        icon: "success"
      })
    } else {
      wx.showToast({
        title: '收藏成功',
        icon: "success"
      })
      this.setData({
        collectimg: "../images/scc.png"
      })

      const db = wx.cloud.database()
      var proId = this.data.product._id
      var img = this.data.product.fileId
      var title = this.data.product.title
      db.collection("collect").add({
        data: {
          img: img,
          proId: proId,
          title: title
        }
      })
    }
  },

  yuding: function () {
    var that=this
    var id = this.data.product._id
    wx.showModal({
      title: '预定',
      content: that.data.product.price,
      success(res) {
        if (res.confirm) {
          console.log('用户点确定了')
          that.setData({
            isBuy:true,
            canBuy:false
          })
          wx.cloud.callFunction({
            name: "updatePro",
            data: {
              id: id
            },
            complete: function (e) {
              wx.showToast({
                title: '预定成功',
                icon: "success"
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  comment: function () {
    var that = this
    const db = wx.cloud.database()
    var content = this.data.content
    var proId = this.data.product._id
    db.collection("comment").add({
      data: {
        content: content,
        proId: proId,
        headimg: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        title: app.globalData.product.title,
        child:[]
      },
      success: function (e) {
        console.log("add suc", e)
        var comments = that.data.comments
        comments.push({
          content: content,
          proId: proId,
          headimg: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName
        })
        that.setData({
          comments: comments
        })
      }
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

  swiperChange: function (e) {
    console.log(e);
    this.setData({
      index: e.detail.current + 1   //获取当前轮播图片的下标
    })
  },

  getCollect: function () {
    var that = this
    const db = wx.cloud.database()
    var proId = app.globalData.product._id
    console.log("getCollect")
    wx.cloud.callFunction({
      name: "login",
      complete: function (e) {
        console.log("getCollection", e)
        var openid = e.result.openid
        const db = wx.cloud.database()
        db.collection("collect").where({
          proId: proId,
          _openid: openid
        }).get({
          success: function (e) {
            console.log("succol", e)
            if (e.data.length != 0) {
              that.setData({
                collectimg: "../images/scc.png"
              })
            }
          }
        })
      }
    })

    db.collection("collect").where({
      proId: proId
    }).get().then(res => {
      that.setData({
        colnum: res.data.length
      })
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCollect()
    this.setData({
      product: app.globalData.product
    })
    var that = this
    var openid = app.globalData.openid
    const db = wx.cloud.database()
    var proId = app.globalData.product._id
    db.collection("product").where({
      _id: proId
    }).get({
      success: function (e) {
        if (e.data[0].isBuy) {
          that.setData({
            isBuy: true,
            canBuy: false
          })
        } else {
          that.setData({
            isBuy: false,
            canBuy: true
          })
        }
      }
    })
    console.log("pid", proId)
    db.collection("picture").where({
      proId: proId
    }).get({
      success: function (e) {
        console.log("pic", e)
        that.setData({
          imgs: e.data,
          len: e.data.length
        })
      }
    })

    db.collection("shop").where({
      _openid: openid
    }).get({
      success: function (e) {
        console.log("shop", e)
        that.setData({
          shop: e.data[0]
        })
      }
    })

    db.collection("user").where({
      _openid: openid
    }).get({
      success: function (e) {
        console.log("shopUser", e)
        that.setData({
          shopUser: e.data[0]
        })
      }
    })

    db.collection("comment").where({
      proId: proId
    }).get({
      success: function (e) {
        that.setData({
          comments: e.data,
          comnum: e.data.length
        })
        console.log("commnets", e)
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