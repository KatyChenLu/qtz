// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList: [{
        id: 0,
        img: "/static/info.png",
        name: "个人信息"
      },
      {
        id: 1,
        img: "/static/act.png",
        name: "我的活动"
      },
      {
        id: 2,
        img: "/static/collect.png",
        name: "积分认定"
      },
      {
        id: 3,
        img: "/static/swap.png",
        name: "我的兑换"
      },
      {
        id: 4,
        img: "/static/address.png",
        name: "我的地址"
      },
      {
        id: 5,
        img: "/static/sys.png",
        name: "扫一扫"
      },
      {
        id: 6,
        img: "/static/feed.png",
        name: "意见反馈"
      },
    ],
    // 是否加入家庭
    isHome: false
  },
  // 前往用户信息
  goUser(e) {
    const index = e.currentTarget.dataset.index
    if (index == 0) return wx.navigateTo({
      url: '/pages/mine/user/index',
    })
    if(index == 1) return wx.navigateTo({
      url: '/pages/mine/my_activity/index',
    })
    if(index == 2) return wx.navigateTo({
      url: '/pages/mine/score/index',
    })

  },
  // 查看积分明细
  checkScore() {
    console.log(111)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    return
    const token = wx.getStorageSync('access_token')
    if (token === "") {
      wx.redirectTo({
        url: '/pages/login/index',
      })
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