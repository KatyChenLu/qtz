// pages/shop/product/index.js
import {
  request
} from "../../../api/index"
import { say } from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    detail: {},
    isShow: false,
    list: [],
    selectAddress: -1
  },
  // 获取商品详情
  async getDetail(id) {
    let res = await request("get", "/goods/detail", {
      goods_id: id
    })
    this.setData({
      detail: res.data.detail
    })
  },
  closeBook() {
    this.setData({
      isShow: false
    })
  },
  openBook() {
    this.setData({
      isShow: true
    })
    console.log(this.data.isShow)
  },
  // 下单
  async book() {
    if(this.data.list.length === 0) return wx.showModal({
      title: '温馨提示',
      content: '请先填写收货地址',
      showCancel:false,
      complete: (res) => {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/mine/address/index',
          })
        }
      }
    })
    const index = this.data.list.findIndex(e=>e.address_id == this.data.selectAddress)
    console.log(index)
    let res = await request("post", "/goods/orderCreate", {
      "goods_id": this.data.detail.goods_id, //商品id
      "goods_name": this.data.detail.goods_name, //商品名称
      "integral": this.data.detail.integral, //单件积分
      "num": 1, //购买数量
      "address_id": this.data.selectAddress, //地址id
      "consignee_name": this.data.list[index].consignee_name, //收货人
      "consignee_phone": this.data.list[index].consignee_phone, //收货电话
      "area_id": this.data.selectAddress, //区域id
      "area_name": this.data.list[index].area_name, //区域名称
      "address":this.data.list[index].address
    })
    if(res.code != 200) return
    this.setData({isShow:false})
    wx.showModal({
      title: '温馨提示',
      content: '购买成功',
      showCancel:false,
      complete: (res) => {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/mine/swap/index',
          })
        }
      }
    })
  },
  // 获取收货地址
  async getAddressList() {
    let res = await request("get", "/address/list")
    if (res.code != 200) return
    this.setData({
      list: res.data.list
    })
    const index = this.data.list.findIndex(e => e.default === 1)
    this.setData({
      selectAddress: this.data.list[index].address_id
    })
  },
  // 选择地址
  onChange(e) {
    console.log(e)
    this.setData({
      selectAddress: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)

    Promise.all([this.getDetail(options.id), this.getAddressList()])

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