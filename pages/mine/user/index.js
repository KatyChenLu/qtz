// pages/mine/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      username: {
        important: true,
        label: "姓名",
        default: "苏海恩"
      },
      sex: {
        important: true,
        label: "性别",
        default: "0"
      },
      phone: {
        important: true,
        label: "联系电话",
        default: "13826821659"
      },
      family: {
        important: false,
        label: "家庭名称",
        default: "尚未加入家庭"
      },
      address: {
        important: true,
        label: "现居或工作、生活地址"
      },
      contactAddress: {
        important: false,
        label: "联系地址"
      },
      idCard: {
        important: false,
        label: "身份证号码"
      },
      ergentUser: {
        important: false,
        label: "紧急联系人"
      },
      ergentPhone: {
        important: false,
        label: "紧急联系人电话"
      },
    },
    avatarUrl: "",
    phone: "",
    nickName: ""
  },
  // 选择性别
  onChange(e) {
    this.setData({
      ['form.sex.default']: e.detail
    })
  },
  // 获取用户信息
  getUserInfo() {
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl'),
      nickName: wx.getStorageSync('nickName'),
      'form.phone.default':wx.getStorageSync('phone')
    })
  },
  // 获取当前输入的手机
  getNowPhone(e){this.setData({'form.phone.default':parseInt(e.detail.value)})},
  // 保存信息
  save() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo()
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