// pages/mine/address/address_detail/index.js
import {
  request
} from "../../../../api/index"
import { checkPhone,say,checkEmpty } from "../../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    regionSelect: "",
    regionId: -1,
    isEdit: false,
    username: "",
    phone: "",
    detail: "",
    default:false,
    address_id:null
  },
  // 获取区域列表
  async getRegion() {
    let res = await request("get", "/area/big")
    if (res.code != 200) return
    this.setData({
      region: res.data
    })
  },
  // 修改区域
  changeAddress(e) {
    this.setData({
      regionSelect: this.data.region[e.detail.value].area_name,
      regionId: this.data.region[e.detail.value].area_id
    })
  },
  // 添加地址
  async addAddress() {
    if(!checkEmpty(this.data.username)) return say("姓名不可为空")
    if(this.data.username.length >= 10) return say("姓名不可超过10个字符")
    if(!checkPhone(this.data.phone)) return say("手机格式不正确")
    if(this.data.regionId === -1) return say("请选择区域")
    const data = {
      "consignee_name": this.data.username, //收货人
      "consignee_phone": this.data.phone, //收货电话
      "area_id": this.data.regionId, //区域id
      "address": this.data.detail, //详细地址
      "default": this.data.default ? 1 : 0 //1默认 0非默认
    }
    if (!this.data.isEdit) {
      let res = await request("post", "/address/add",data)
      if(res.code != 200) return
      say("添加成功")
      wx.redirectTo({
        url: '/pages/mine/address/index',
      })
    }else {
      let res = await request("post","/address/update",{address_id:this.data.address_id,...data})
      if(res.code != 200) return
      say("修改成功")
      wx.redirectTo({
        url: '/pages/mine/address/index',
      })
    }
  },
  // 获取地址详情
  async getDetail(id){
    let res = await request("get","/address/detail",{address_id:id})
    if(res.code != 200) return
    const info = res.data.detail
    const index = this.data.region.findIndex(e=>e.area_id == info.area_id)
    this.setData({
      address_id:info.address_id,
      username:info.consignee_name,
      phone:info.consignee_phone,
      regionId:info.area_id,
      regionSelect: this.data.region[index].area_name,
      detail:info.address,
      default:info.default==1?true:false
    })
  },
  // 修改表单
  onchange(e) {
    const type = e.currentTarget.dataset.type
    const value = e.detail.value
    console.log(value)
    if (type == 0) {
      this.setData({
        username: value
      })
    } else if (type == 1) {
      this.setData({
        phone: value
      })
    } else if (type == 2) {
      this.setData({
        detail: value
      })
    }
  },
  // 删除地址
  async deleteAddress(){
    let res = await request("post","/address/del",{address_id:this.data.address_id})
    if(res.code != 200) return
    wx.navigateBack()
  },
  changeDefault(e){
    this.setData({default:!this.data.default})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getRegion()])
    console.log(options)
    if (options.id !== undefined) {
      this.getDetail(options.id)
      this.setData({
        isEdit: true
      })
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