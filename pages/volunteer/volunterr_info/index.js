// pages/volunteer/volunterr_info/index.js
import { request } from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  // 获取志愿队列表
  async getList() {
    let res = await request("get","/volunteer/all")
    if(res.code != 200) return
    this.setData({list:res.data.list})
  },
  go(e){
    wx.navigateTo({
      url: '/pages/volunteer/detail/index?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getList()])
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