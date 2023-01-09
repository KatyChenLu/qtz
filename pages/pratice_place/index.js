import {
  request
} from "../../api/index"

// pages/pratice_place/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: 0,
        name: "实践中心",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 1,
        name: "上园村",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 2,
        name: "上园村",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 3,
        name: "上园村",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 4,
        name: "上园村",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 5,
        name: "卡双卡单卡",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 6,
        name: "上园村",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 7,
        name: "上园村",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 8,
        name: "上园村",
        time: "周一到周日 8:30-17:30"
      },
      {
        id: 9,
        name: "上园村",
        time: "周一到周日 8:30-17:30"
      },
    ],
    // 是否显示弹出
    show: false,
    nowDetail: {}
  },
  // 打开详情
  openDetail(e) {
    this.setData({
      nowDetail: e.currentTarget.dataset.detail
    })

    this.setData({
      show: true
    })
  },
  // 关闭遮罩层
  closePopup() {
    this.setData({
      show: false
    })
  },
  // 前往地图
  goMap() {
    wx.openLocation({
      latitude: 24.0812917700, //维度
      longitude: 110.4562530500, //经度
      name: "茶山镇茶花广场",
      scale: 15,
      address: "东莞市"
    })
  },
  // 获取阵地
  async getList() {
    let res = await request("get", "/position/all")
    this.setData({
      list: res.data.area,
      nowUrl:res.data.image
    })
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