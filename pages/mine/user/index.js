// pages/mine/user/index.js
import {
  request
} from "../../../api/index"
import {
  checkEmpty,
  checkIdCard,
  checkPhone,
  say
} from "../../../utils/util"
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
        default: "1"
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
    range: [],
    avatarUrl: "",
    phone: "",
    nickName: "",
    userInfo: {},
    address: "请选择"
  },
  // 完善信息
  perfectInfo(e) {
    const type = e.currentTarget.dataset.type
    if (type === 0) {
      this.setData({
        "userInfo.compellation": e.detail.value
      })
    } else if (type === 1) {
      this.setData({
        "userInfo.contact_number": e.detail.value
      })
    } else if (type === 2) {
      this.setData({
        "userInfo.contact_address": e.detail.value
      })
    } else if (type === 3) {
      this.setData({
        'userInfo.idCard': e.detail.value
      })
    } else if (type === 4) {
      this.setData({
        'userInfo.eme_contact': e.detail.value
      })
    } else if (type === 5) {
      this.setData({
        'userInfo.eme_phone': e.detail.value
      })
    }
  },
  // 获取区域列表
  async getArea() {
    let res = await request("get", "/area/all")
    this.setData({
      range: res.data
    })
  },
  // 选择性别
  onChange(e) {
    this.setData({
      ['userInfo.sex']: e.detail
    })
  },
  // 获取用户信息
  async getUserInfo() {
    let res = await request("get", "/user/info")
    if (res.code != 200) return
    if (res.data.is_login == 0) return wx.redirectTo({
      url: '/pages/login/index',
    })
    this.setData({
      userInfo: res.data.userInfo,
    })
    this.setData({"userInfo.contact_number":this.data.userInfo.phone})
  },
  // 获取当前输入的手机
  getNowPhone(e) {
    this.setData({
      'form.phone.default': parseInt(e.detail.value)
    })
  },
  // 保存信息
  async save() {
    if(!checkEmpty(this.data.userInfo.compellation)) return say("名字不可为空")
    if(!checkPhone(this.data.userInfo.contact_number)) return say("手机格式不正确")
    if (this.data.userInfo.area_id === 0) return say("请选择现居地址")
    if(!checkEmpty(this.data.userInfo.contact_address)) return say("联系地址不可为空")
    if(!checkIdCard(this.data.userInfo.idCard)) return say("身份证号码格式不正确")
    if(!checkEmpty(this.data.userInfo.eme_contact)) return say("紧急联系人不可为空")
    if(!checkPhone(this.data.userInfo.eme_phone)) return say("紧急联系电话不可为空")

    let res = await request("post", "/user/perfectInfo", {
      "compellation": this.data.userInfo.compellation, //姓名 不超过255
      "sex": parseInt(this.data.userInfo.sex), //1男 2女
      "contact_number": this.data.userInfo.contact_number, //电话号码 电话正则
      "area_id": this.data.userInfo.area_id, //区域id 0代表其他地方
      "contact_address": this.data.userInfo.contact_address, //联系地址  不超过255
      "idCard": this.data.userInfo.idCard, //身份证号码 身份证正则
      "eme_contact": this.data.userInfo.eme_contact, //紧急联系人 不超过255
      "eme_phone": this.data.userInfo.eme_phone //紧急联系电话 电话正则
    })
    if (res.code == 200) return wx.showModal({
      title: '温馨提示',
      content: '资料完善成功',
      complete: (res) => {
        if (res.cancel) {
          wx.navigateBack()
        }
    
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
  },
  // 选择区域
  selectRange(e) {
    console.log(e)
    this.setData({
      address: this.data.range[e.detail.value].area_name,
      'userInfo.area_id': this.data.range[e.detail.value].area_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getUserInfo(), this.getArea()])

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