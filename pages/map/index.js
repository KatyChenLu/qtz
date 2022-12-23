// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  nav: function () {
    wx.openLocation({
      latitude: 36.0812917700, //维度
      longitude: 114.4562530500, //经度
      name: "目的地", //目的地定位名称
      scale: 15, //缩放比例
      address: "目的地" //导航详细地址
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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