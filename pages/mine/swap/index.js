// pages/mine/swap/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择
    tabs: [{
      id: 0,
      name: "线下兑换"
    }, {
      id: 1,
      name: "快递配送"
    }],
    current: 0, //当前选择
    // 当前选择的高度
    tabsHeight:0,
  },
  changeTabs(e){
    this.setData({current:e.currentTarget.dataset.index})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const tabs = wx.createSelectorQuery().select(".tabs").boundingClientRect()
    tabs.exec((res)=>{
      this.setData({tabsHeight:res[0].height})
    })
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