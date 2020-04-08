// miniprogram/pages/mypost/postDisplay/postDisplay.js
var app=getApp()
var comId=""
var id=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:null,
    content:null,
    focus: false,
    comments:[],
    Content:"",
  },

  contentInput(e) { //当输入框的值发生改变时，获取
    this.setData({
      Content: e.detail.value
    });
  },

  tapComment:function(e){
    comId=this.data.comments[e.currentTarget.id]._id
    console.log("tap",this.data.comments,e.currentTarget.id,this.data.comments[e.currentTarget.id]._id,comId)
    id=e.currentTarget.id
    this.setData({
      focus:true
    })
  },

  comment:function(){
    var that=this
    const db = wx.cloud.database()
    var content=this.data.Content
    var postId=app.globalData.post._id
    var title=app.globalData.post._id
    var headimg=app.globalData.post.headimg
    var nickName=app.globalData.post.nickName
    if(comId==""){
      console.log("parent")
      db.collection("postComment").add({
        data:{
          content:content,
          postId:postId,
          headimg:app.globalData.userInfo.avatarUrl,
          nickName:app.globalData.userInfo.nickName,
          child:[]
        },
        success:function(e){
          console.log("add suc",e)
          var comments=that.data.comments
          comments.push({
          content:content,
          postId:postId,
          headimg:app.globalData.userInfo.avatarUrl,
          nickName:app.globalData.userInfo.nickName,
          child:[],
          _id:e._id,
          })
          that.setData({
            comments:comments
          })
        }
      })
    }else{
      console.log("child",comId)
      var com={
          content:content,
          headimg:app.globalData.userInfo.avatarUrl,
          nickName:app.globalData.userInfo.nickName,
          id:comId
      }

      db.collection("reply").add({
        data:{
          headimg:headimg,
          nickName:nickName,
          postId:postId,
          title:title,
          content:content
        }
      }).then(res=>{console.log("添加成功"),res})
      var coms=that.data.comments
      console.log(coms)
      coms[id].child.push(com)
      that.setData({
        comments:coms
      })

      console.log("com",com)
      wx.cloud.callFunction({
        name:"updateCom",
        data:{
          com:com
        },
        complete:function(e){
          console.log("complete")
          comId=""
        }
      })
    }
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
    this.setData({
      title:app.globalData.post.title,
      content:app.globalData.post.html
    })

    const db=wx.cloud.database()
    db.collection("postComment").where({
      postId:app.globalData.post._id
    }).get({
      success:function(e){
        console.log("comments",e)
        that.setData({
          comments:e.data
        })
      }
    })
  },

  blo:function(){
    console.log(this.data.comments)
    var cs=this.data.comments
    this.setData({
      comments:cs
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