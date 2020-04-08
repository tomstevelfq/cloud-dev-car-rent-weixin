let app=getApp()
Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    html:"",
    fileId:"",
    title:"",
    imgUrls:[],
    id:null,
    isUpdate:false
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad(option) {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()

    setTimeout(()=>{
      console.log(app.globalData.html)
      that.editorCtx.setContents({
        html:app.globalData.html,
      })
    },1000)
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },


  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var timestamp = Date.parse(new Date());
        wx.cloud.uploadFile({
          cloudPath: timestamp+'.png', // 上传至云端的路径
          filePath: res.tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            that.editorCtx.insertImage({
              src: res.fileID,
              data: {
                id: 'abcd',
                role: 'god'
              },
              width: '100%',
              success: function () {
                console.log('insert image success')
                console.log(that.editorCtx.context)
              }
            })
          },
          fail: console.error
        })
      }
    })
  },

  // that.editorCtx.insertImage({
  //   src: that.data.url,
  //   data: {
  //     id: 'abcd',
  //     role: 'god'
  //   },
  //   width: '100%',
  //   success: function () {
  //     console.log('insert image success')
  //     console.log(that.editorCtx.context)
  //   }
  // })

  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = ".";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  save(){
    const that=this
    var title=that.data.title
    this.editorCtx.getContents({
      success: (res) => {
        console.log("text",res.text)
        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);

        that.setData({
          html:res.html,
        })

        const db = wx.cloud.database()
        db.collection("post").add({
          data:{
            html:res.html,
            title:title,
            headimg:app.globalData.userInfo.avatarUrl,
            nickName:app.globalData.userInfo.nickName
          },
          success:function(e){
            console.log("发帖成功",e)
            wx.showToast({
              title: '发帖成功',
              icon:"success"
            })
          }
        })
      },
    })

    console.log("this is"+that.data.html)
  },

  title(e){
    this.setData({
      title:e.detail.value
    })
  }
})
