// pages/mine/my_activity/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  go(){
    wx.navigateTo({
      url: '/pages/activity_info/index',
    })
  },
  // 取消报名
  cancelBaoming(){
    wx.showModal({
      title: '温馨提示',
      content: '是否取消报名',
      success: (res) => {
        if (res.cancel) {
          return
        }else if (res.confirm){
          wx.showToast({
            title:"取消报名成功",
            icon:"none",
            duration:1000,
            complete:()=>{setTimeout(()=>{wx.hideToast()},1000)}
          })
        }
    
        if (res.confirm) {
          
        }
      }
    })
  },
  // 微信扫一扫
  scanCode(){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ["qrCode"],
      success: (result) => {
        console.log(result)
      },
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