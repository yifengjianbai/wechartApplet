// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '放松一刻',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: false, //wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')  如需尝试获取用户信息可改为false
  },
  onLoad() {

  },
  getUserProfile() {
    let that = this;
    console.log('getUserProfile');
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        debugger;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.request({
          url: 'https://small.yifengjianbai.com/WeChatRelation/GetSessionKey?code='+app.globalData.code,
          method:'GET',
          success:function(r){
            debugger
            let sessionKey = r.data;
            that.decryptUserInfo(res.encryptedData,res.iv,sessionKey);
          },
          fail:function(e){
            wx.showToast({
              title: e,
            })
          }
        })

      }
    })
  },
  decryptUserInfo(encryptData, iv, sessionKey){
    debugger;
    var WXBizDataCrypt = require('WXBizDataCrypt')
    var appId = 'wx58e572956b1ea04f'
    var pc = new WXBizDataCrypt(appId, sessionKey)
    var data = pc.decryptData(encryptData , iv)
  }
})
