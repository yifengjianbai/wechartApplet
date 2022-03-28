// app.js
App({
  onLaunch() {
    // 展示本地缓存
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        this.globalData.code = res.code;
        wx.request({
          url: 'https://small.yifengjianbai.com/WeChatRelation/GetOpenId?code='+res.code,
          success:r => {
            this.globalData.openId = r.data;
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    code:'',
    openId:'',
  }
})
