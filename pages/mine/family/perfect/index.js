// pages/mine/family/perfect/index.js
import {
  say,
  checkPhone,
  checkIdCard,
  checkEmpty
} from "../../../../utils/util"
import {
  request
} from "../../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    creator: "", //创建人
    phone: "",
    address: "", //现居地
    address_show: "",
    huji: "", //户籍,
    huji_show: "",
    now_address: "", //现居联络地
    idCard: "",
    familyList: [{
        name: "0",
        title: "爷爷"
      },
      {
        name: "1",
        title: "奶奶"
      },
      {
        name: "2",
        title: "丈夫"
      },
      {
        name: "3",
        title: "妻子"
      },
      {
        name: "4",
        title: "爸爸"
      },
      {
        name: "5",
        title: "妈妈"
      },
      {
        name: "6",
        title: "儿子"
      },
      {
        name: "7",
        title: "儿子"
      },
      {
        name: "8",
        title: "儿子"
      },
      {
        name: "9",
        title: "儿子"
      },
    ],
    addressRange: [{
      id: 0,
      name: "上元"
    }, {
      id: 1,
      name: "龙瑞"
    }],
    hujiRange: [{
      id: 0,
      name: "上元"
    }, {
      id: 1,
      name: "龙瑞"
    }],
    // 选择结果
    checkResult: []
  },
  // 修改现居地
  changeAddress(e) {
    console.log(e)
    this.setData({
      address: this.data.addressRange[parseInt(e.detail.value)].area_id,
      address_show: this.data.addressRange[parseInt(e.detail.value)].area_name
    })
  },
  changeHuji(e) {
    this.setData({
      huji: this.data.hujiRange[parseInt(e.detail.value)].area_id,
      huji_show: this.data.hujiRange[parseInt(e.detail.value)].area_name
    })
  },
  changeCheckBox(e) {
    this.setData({
      checkResult: e.detail
    })
  },
  changeName(e) {
    this.setData({
      creator: e.detail.value
    })
  },
  changePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  changeNowAddress(e) {
    this.setData({
      now_address: e.detail.value
    })
  },
  changeIdCard(e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  // 获取家庭成员关系配置
  async getFamily(){
    let res = await request("get","/settings/memberConfig")
    if(res.code != 200) return
    console.log(res.data)
    this.setData({familyList:res.data.memberConfig})
  },
  // 获取户籍地区
  async getRegion(){
    let res = await request("get","/area/all")
    if(res.code != 200) return
    this.setData({addressRange:res.data,hujiRange:[{area_id:0,area_name:"其他户籍"},...res.data]})
  },
  // 提交表单
  async submit() {
    if (this.data.creator.length >= 10) return say("姓名格式不正确")
    if (!checkEmpty(this.data.creator)) return say("姓名不可为空")
    if (!checkPhone(this.data.phone)) return say("手机格式不正确")
    if(this.data.address === "") return say("请选择现居地址")
    if(this.data.huji === "") return say("请选择户籍")
    if (!checkEmpty(this.data.now_address)) return say("现居联络地址不可为空")
    console.log(checkIdCard(this.data.idCard))
    if (!checkIdCard(this.data.idCard)) return say("身份证格式不正确")
    if (this.data.checkResult.length === 0) return say("家庭关系不可为空")
    const data = {
      create_name: this.data.creator,
      contact_number: this.data.phone,
      present_address: this.data.address,
      census_register: this.data.huji,
      contact_address: this.data.now_address,
      idCard: this.data.idCard,
      member: this.data.checkResult
    }
    console.log(data)
    let res = await request("post", "/family/create", data)
    if (res.code != 200) return
    wx.showModal({
      title: '创建成功',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {
         
        }
        wx.redirectTo({
          url: '/pages/mine/family/detail/index',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getFamily(),this.getRegion()])
    
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