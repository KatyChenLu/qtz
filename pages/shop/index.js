// pages/shop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商城分类
    shopSelect: [{
        id: 0,
        name: "积分商城"
      },
      {
        id: 1,
        name: "爱心商家"
      }
    ],
    // 当前商城分类
    current: 0,
    // 标签分类
    tagList:[
      {id:0,name:"文创产品"},
      {id:1,name:"爱心捐赠"},
      {id:2,name:"儿童教育"},
      {id:3,name:"\"学习强国\"礼品"},
      {id:4,name:"益智游戏玩具"}
    ],
    // 当前选择的标签
    tagCurrent:0,
  },
  // 选择商城类别
  changeSelect(e) {
    //  e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.index
    if (id == 0) {
      this.setData({
        current: e.currentTarget.dataset.index
      })
    }else{
      wx.showModal({
        title: '温馨提示',
        content: '正在上线中'
      })
    }

  },
  // 打开兑换须知
  openSwap(){
    wx.navigateTo({
      url: '/pages/shop/younow/index',
    })
  },
  // 前往商品详情
  goProduct(){
    wx.navigateTo({
      url: '/pages/shop/product/index',
    })
  },
  // 选择标签
  changeTag(e){
    this.setData({
      tagCurrent:e.currentTarget.dataset.index
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