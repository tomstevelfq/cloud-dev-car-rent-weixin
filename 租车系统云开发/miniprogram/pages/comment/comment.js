// miniprogram/pages/comment/comment.js
Page({
  data: {
    content: '',
    focus: false
  },
  bindReply(e) {
    this.setData({
      focus: true
    });
  },
  contentInput(e) { //当输入框的值发生改变时，获取
    this.setData({
      content: e.detail.value
    });
  }
})