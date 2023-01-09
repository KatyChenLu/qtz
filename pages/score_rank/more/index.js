import {
  request
} from "../../../api/index"

// pages/score_rank/more/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, //排行榜分类
    list: 10,
    page: {
      limit: 20,
      offset: 0,
    },
    isLoading: false
  },
  async getList() {
    if (this.data.isLoading) return
    this.setData({
      isLoading: true
    })
    if (this.data.type == 0) {
      let res = await request("get", "/integral/soloRankList", {
        ...this.data.page
      })
      this.setData({
        list: res.data.list
      })
    } else {
      let res = await request("get", "/familyRankList", {
        ...this.data.page
      })
      this.setData({
        list: res.data.list
      })
    }
    this.setData({
      'page.offset': ++this.data.page.offset
    })
    this.setData({
      isLoading: true
    })
  },
  // 获取更多的列表
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.setData({
      type: options.id
    })
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})