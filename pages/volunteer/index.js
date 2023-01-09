// pages/volunteer/index.js
import { request } from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 展示二维码
    show: false,
    img:"",
    qrcode:""
  },
  // 获取志愿服务队二维码以及介绍
  async getVolunteer(){
    let res = await request("get","/volunteer/before")
    if(res.code != 200) return
    this.setData({img:res.data.volunteer_img,qrcode:res.data.volunteer_qrcode})
  },
  go(e) {
    const index = e.currentTarget.dataset.index
    if (index == 0) {
      wx.navigateTo({
        url: '/pages/volunteer/volunterr_info/index',
      })
    } else {
      this.setData({
        show: true
      })
    }
  },
  // 关闭遮罩层
  closePopup() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getVolunteer()])
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