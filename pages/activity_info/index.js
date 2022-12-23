// pages/activity_info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    baoming: 6,
    hasbaoming: 4,
    progressWidth: 0,
    swiperList: [{
        id: 0,
        color: "red"
      },
      {
        id: 1,
        color: "pink"
      },
      {
        id: 2,
        color: "orange"
      },
    ],
    infoList: [{
        id: 0,
        name: "茶山医院",
        img: "/static/address.png"
      },
      {
        id: 1,
        name: "2022-12-23 14:00",
        img: "/static/time.png"
      },
      {
        id: 2,
        name: "2022-12-23 18:00",
        img: "/static/time.png"
      },
    ]
  },
    // 打开详情
    openDetail(e){
      this.setData({show:true})
    },
    // 关闭遮罩层
    closePopup(){
      this.setData({show:false})
    },
  // 前往地图
  goMap() {
    wx.openLocation({
      latitude:24.0812917700,	//维度
      longitude: 110.4562530500, //经度
      name:"茶山镇茶花广场",
      scale:15,
      address:"东莞市"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const demo = this.createSelectorQuery().select('.progress-in').boundingClientRect()
    demo.exec((res) => {
        this.setData({
          progressWidth: res[0].width * (this.data.hasbaoming / this.data.baoming)
        })

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