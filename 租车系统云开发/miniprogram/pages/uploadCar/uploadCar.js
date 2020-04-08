// miniprogram/pages/uploadCar/uploadCar.js
var flist=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileId:"",
    number:"",
    price:"",
    title:"",
    imgPath:"../images/pic.png",
    imgs:[],
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
  upPic:function(){
    var that = this;
    wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      //res.tempFilePaths 返回图片本地文件路径列表
      var tempFilePaths = res.tempFilePaths;
      
      var imgPath=tempFilePaths[0]
      var imgs=that.data.imgs
      imgs.push(imgPath)
      that.setData({
        imgs:imgs
      })
    }
  })
  },

  price:function(e){
    this.setData({
      price:e.detail.value
    })
  },

  num:function(e){
    this.setData({
      number:e.detail.value
    })
  },

  title:function(e){
    this.setData({
      title:e.detail.value
    })
  },

  btn:function(){
    var that=this
    const db = wx.cloud.database()
    var number=this.data.number
    var title=this.data.title
    var price=this.data.price
    var imgPath=this.data.imgs[0]

    var timestamp = Date.parse(new Date());
    wx.cloud.uploadFile({
      cloudPath: timestamp+'.png', // 上传至云端的路径
      filePath: imgPath, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)

        db.collection("product").add({

          data:{
            number:number,
            title:title,
            price:price,
            fileId:res.fileID,
            isBuy:false
          },
    
          success:function(e){
            console.log(that.data.imgs)
            console.log("add",e)
            var id=e._id
            wx.showToast({
              title: '上传成功',
              icon:"success"
            })
            wx.navigateTo({
              url: '/pages/carManager/carManager',
            })
            var imgs=that.data.imgs
            for(let item of imgs){
              var timestamp = Date.parse(new Date());
              wx.cloud.uploadFile({
                cloudPath: timestamp+Math.floor(Math.random() * 1000000 + 1)+'.png', // 上传至云端的路径
                filePath: item, // 小程序临时文件路径
                success: res => {
                  // 返回文件 ID
                  console.log(res.fileID)
                  db.collection("picture").add({
                    data:{
                      fileId:res.fileID,
                      proId:id
                    }
                  })
                },
                fail: console.error
              })
            }
          }
        })

      },
      fail: console.error
    })


  }

})