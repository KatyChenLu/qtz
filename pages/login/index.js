import {
  request
} from "../../api/index.js"
import {
  checkCode,
  checkPhone,
  say
} from "../../utils/util"

// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 60, //验证码倒计时
    isGetting: false, //是否正在获取验证码
    phone: "", //手机号
    code: "", //验证码
    isLoading: false, //防抖
  },
  // 手机号输入
  iptPhone(e) {},
  iptCode() {},
  // 登录
  async login() {
    if (this.data.isLoading) return
    if (!checkPhone(this.data.phone)) return say("手机格式不正确,请重新输入")
    if (!checkCode(this.data.code)) return say("验证码格式不正确")
    await wx.getUserProfile({
      desc: '用于获取用户昵称，用作展示',
      success: async (res) => {
        wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl)
        wx.setStorageSync('nickName', res.userInfo.nickName)
        wx.setStorageSync("phone", this.data.phone)
        let result = await request("post", "/user/login", {
          phone: this.data.phone,
          code: this.data.code.toUpperCase(),
          avatarUrl:wx.getStorageSync('avatarUrl'),
          nickName:wx.getStorageSync("nickName")
        }, true)
        wx.setStorageSync("token", result.data.access_token)
        if (!result.code == 200) return
        wx.switchTab({url: '/pages/index/index',})
        this.setData({isLoading: true})
      }
    })
  },
  async justLogin(){
    let result = await request("post", "/user/login", {
      phone: '18501610860',
      code: 'GVMHX',
      avatarUrl:'luludetouxiang',
      nickName:'lulu'
    }, true)
    wx.setStorageSync("token", result.data.access_token)
    if (!result.code == 200) return
    wx.switchTab({url: '/pages/index/index',})
    this.setData({isLoading: true})
  },
  // 获取验证码
  async getCode() {
    // 校验手机是否正确
    if (!checkPhone(this.data.phone)) return say("手机格式不正确,请重新输入")
    let res = await request("get", "/code/send", {
      phone: this.data.phone
    })
    this.setData({
      isGetting: true
    })
    setTimeout(() => {
      this.setData({
        count: this.data.count--
      })
    });
    let timer = setInterval(() => {
      if (this.data.count > 1) {
        this.setData({
          count: --this.data.count
        })
      } else {
        this.setData({
          isGetting: false,
          count: 60
        })
        clearInterval(timer)
      }
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})