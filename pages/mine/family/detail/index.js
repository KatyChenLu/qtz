// pages/mine/family/detail/index.js
import {
  request
} from "../../../../api/index"
import {
  say
} from "../../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_bind: 0, //是否绑定该家庭
    joinShow: false,
    joinId: -1, //加入的family_id
    show: false, //二维码展示
    family: {
      "family_id": 0, //家庭id
      "qrcode": "", //二维码地址 为空时发送请求生成
      "create_name": "", //家庭名字
      "total_integral": 0, //家庭所有成员年度总积分
      "is_create": 0, //是否是家庭创始人 1是 0不是
      "family_member": [{
        "nickName": "", //成员昵称
        "phone": "", //成员电话
        "avatarUrl": "", //成员头像
        "member_name": "", //家庭成员
        "member_id": null, //成员id
        "integral": "0" //年度积分
      }], //家庭成员
      "family_member_config": [{
          "member_name": "", //成员名称
          "member_id": -1 //成员id
        },
        {
          "member_name": "", //成员名称
          "member_id": -1 //成员id
        }
      ] //可选家庭成员信息
    },
    memberConfig: [],
    // 选择的家庭关系
    checkResult: ""
  },
  // 选择家庭关系
  changeCheckBox(e) {
    this.setData({
      checkResult: e.detail
    })
  },
  // 修改家庭名称
  editFamilyName() {
    wx.showModal({
      title: '家庭名称',
      editable: true,
      complete: async (res) => {
        if (res.confirm) {
          // 修改家庭名称
          let result = await request("post", "/family/rename", {
            create_name: res.content
          })
          if (result.code != 200) return
          this.getFamilyInfo()
        }
      }
    })
  },
  //展示二维码
  async showCode() {
    let res = await request("post", "/family/getQrcode", {
      family_id: this.data.family.family_id
    })
    if (res.code != 200) return
    this.setData({
      'family.qrcode': res.data.qrcode
    })
    console.log(this.data.family.qrcode)
    this.setData({
      show: true
    })
  },
  async getMember() {
    let res = await request("get", "/settings/memberConfig")
    if (res.code != 200) return
    this.setData({
      memberConfig: res.data.memberConfig
    })
    console.log(this.data.memberConfig)
  },
  // 关闭二维码
  closeCode() {
    this.setData({
      show: false
    })
  },
  // 开启加入
  openJoin() {
    this.setData({
      joinShow: true
    })
  },
  // 退出家庭
  exitFamily() {
    wx.showModal({
      title: '温馨提示',
      content: '您退出后家庭会自动解散',
      complete: async (res) => {
        if (res.confirm) {
          let result = await request('post', "/family/quit", {
            family_id: this.data.family.family_id
          })
          if (result.code != 200) return
          wx.redirectTo({
            url: '/pages/mine/family/index',
          })
        }
      }
    })
  },
  async getFamilyInfo(family_id="") {
    let res = await request("get", "/family/msg",{family_id})
    if (res.code != 200) return
    console.log(res.data.family)
    this.setData({
      family: res.data.family
    })
  },
  // 确认关系后加入家庭
  async confirmJoin() {
    if (this.data.checkResult === "") return
    console.log(this.data.checkResult)
    let res = await request("post", "/family/join", {
      member_id:this.data.checkResult,
      family_id:this.data.joinId
    })
    if(res.code != 200) return 
    this.setData({joinShow:false})
    this.getFamilyInfo()
    say("加入成功")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    if (options.scene === undefined) {
      this.getFamilyInfo()
    } else {
      const id = decodeURIComponent(options.scene).split("=")[1]
      await this.getFamilyInfo(id)
      this.setData({joinShow:true,memberConfig:this.data.family.family_member_config,joinId:id})
    }

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