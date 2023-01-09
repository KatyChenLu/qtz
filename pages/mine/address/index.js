// pages/mine/address/index.js
import { request } from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    nowDefault:-1,
  },

  // 获取收货地址
  async getList(){
    let res = await request("get","/address/list")
    if(res.code != 200) return
    this.setData({list:res.data.list})
  },
  go(e){
    const id = e.currentTarget.dataset.id
    if(id){
      wx.navigateTo({
        url:"/pages/mine/address/address_detail/index?id="+id
      })
    }else{
      wx.navigateTo({
        url:"/pages/mine/address/address_detail/index"
      })
    }

  },
  // 选择默认地址
  async onChange(e){
    let res = await request("post", "/address/setDefault",{address_id:e.currentTarget.dataset.id})
    if(res.code != 200) return
    this.getList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
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
    this.getList()
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