import {
  request
} from "../../../api/index"

// pages/practice/pratice_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },
  async getDetail(practice_id) {
    let res = await request("get", "/practice/detail", {
      practice_id
    })
    this.setData({
      detail: res.data.detail
    })
    console.log(this.data.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.getDetail(options.id)
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