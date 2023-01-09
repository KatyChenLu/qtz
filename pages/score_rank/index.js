// pages/score_rank/index.js
import {
  request
} from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "/static/avatar_in.png", //人物默认头像
    rankData: {
      myRank: -1,
      yearScore: null,
      myHomeRank: "未加入家庭",
      swapScore: null
    },
    // tabs内容
    tabs: [{
      id: 0,
      title: "个人排行榜"
    }, {
      id: 1,
      title: "家庭排行榜"
    }],
    // 当前选择
    current: 0,
    // 此时头像、排名、选择的高度
    avatarHeight: 0,
    rankHeight: 0,
    swiperTabsHeight: 0,
    // 个人排行榜信息
    singleRank: [],
    familyRank: [],
    
  },
  //警告展示
  showWarnning() {
    wx.showModal({
      title: '积分提示',
      content: '年度积分用于排名，按年度清零',
    })
  },
  // 更换排名
  switchRank(e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },
  // 手滑动排行榜
  rankChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 前往查看更多
  goMore(e) {
    // if(e.currentTarget.dataset.index == 0)
    const index = parseInt(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: `/pages/score_rank/more/index?id=${index}`
    })
  },
  // 获取我的排名
  async getMyRank() {
    let res = await request("get", "/integral/upperHalf")
    if (res.code != 200) return
    if (res.data.is_login == 0) return wx.redirectTo({
      url: '/pages/login/index',
    })
    this.setData({
      rankData: res.data.info
    })
  },
  // 获取个人排行
  async getSingleRank() {
    let res = await request('get', "/integral/soloRankList", {
        limit: 10,
        offset: 0
      })
    if (res.code != 200) return
    this.setData({singleRank:res.data.list})
  },
  // 家庭排行
  async getFamilyRank() {
    let res = await request('get', "/integral/familyRankList", {
        limit: 10,
        offset: 0
      })
    if (res.code != 200) return
    this.setData({familyRank:res.data.list})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getMyRank(),this.getSingleRank(),this.getFamilyRank()])
    // 获取剩余的滚动高度
    const res = wx.createSelectorQuery()
    res.select("#avatar").boundingClientRect()
    res.select("#rank").boundingClientRect()
    res.select("#swiper-tabs").boundingClientRect()
    res.exec((v) => {
      this.setData({
        avatarHeight: v[0].height,
        rankHeight: v[1].height,
        swiperTabsHeight: v[2].height
      })
      console.log(this.data.avatarHeight, this.data.rankHeight, this.data.swiperTabsHeight)
    })
    // 获取人物头像
    if (!wx.getStorageSync("avatarUrl")) return
    this.setData({
      avatarUrl: wx.getStorageSync("avatarUrl")
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