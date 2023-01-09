// pages/activity/index.js
import {
  request
} from "../../api/index"
import {
  formatTime
} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    selectList: [{
        id: 0,
        name: "地点",
        mode: "selector",
        range: [],
        rangeKey: 'area_name'
      },
      {
        id: 1,
        name: "时间",
        mode: "selector",
        range: [],
        rangeKey: "time_name"
      },
      {
        id: 2,
        name: "分类",
        mode: "selector",
        range: [],
        rangeKey: 'classify_name'
      },
    ],
    // 活动列表配置
    activityConfig: {
      page: 1,
      pageSize: 10,
      list: []
    },
    config: {
      area_id: "",
      classify_id: "",
      start_time: "",
      activity_name: "",
    },
    isLoading: false,
  },
  async getActivityList() {
    if (this.data.isLoading) return
    this.setData({
      isLoading: true
    })
    let res = await request("get", "/activity/list", {
      pageNum: this.data.activityConfig.page,
      pageSize: this.data.activityConfig.pageSize,
      ...this.data.config
    })
    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    }, 1000)
    if (res.code == 200) {
      if (res.data.list.length === 0) return
      this.setData({
        'activityConfig.page': ++this.data.activityConfig.page
      })
      this.setData({
        'activityConfig.list': [...this.data.activityConfig.list, ...res.data.list]
      })
    }
  },
  // 分类时的请求
  async inCategoryList() {
    let res = await request("get", "/activity/list", {
      pageSize: 10,
      pageNum: 1,
      ...this.data.config
    })
    this.setData({
      'activityConfig.list': [...res.data.list]
    })

  },
  // 活动名字
  inputName(e) {
    this.setData({
      'config.activity_name': e.detail.value
    })
    this.inCategoryList()
  },
  // 重置
  resetForm() {
    this.setData({
      'selectList[0].name': "地点",
      'selectList[1].name': "时间",
      'selectList[2].name': "分类",
      "config.activity_name": "",
      'config.area_id': "",
      'config.classify_id': "",
      'config.start_time': ""
    })
    this.inCategoryList()
  },
  // 确认
  confirm(e) {
    const index = e.currentTarget.dataset.id
    if (index === 0) {
      const index = parseInt(e.detail.value)
      this.setData({
        'selectList[0].name': this.data.selectList[0].range[index].area_name
      })
      this.setData({
        'config.area_id': this.data.selectList[0].range[index].area_id
      })
    } else if (index === 1) {
      const index = parseInt(e.detail.value)
      this.setData({
        'selectList[1].name': this.data.selectList[1].range[index].time_name
      })
      this.setData({
        'config.start_time': this.data.selectList[1].range[index].time_name
      })
    } else if (index === 2) {
      const index = parseInt(e.detail.value)
      this.setData({
        'selectList[2].name': this.data.selectList[2].range[index].classify_name
      })
      this.setData({
        'config.classify_id': this.data.selectList[2].range[index].classify_id
      })
    }
    this.inCategoryList()
  },
  // 获取地点
  async getAddress() {
    let res = await request("get", "/area/all")
    if (res.code != 200) return
    this.setData({
      'selectList[0].range': res.data
    })
  },
  // 获取分类
  async getCategory() {
    let res = await request("get", "/activity_classify/all")
    if (res.code != 200) return
    this.setData({
      'selectList[2].range': res.data
    })
  },
  // 获取日期
  async DateList() {
    let arr = []
    let nowdate = formatTime(new Date())
    for (let i = 0; i < 4; i++) {
      let last = parseInt(nowdate.split('-')[2]) - (i + 1)
      let tmp = nowdate.split("-")
      tmp.splice(2, 1, last)
      tmp = tmp.join("-")
      arr.unshift(tmp)
    }
    arr.push(nowdate)
    for (let i = 0; i < 4; i++) {
      let last = parseInt(nowdate.split('-')[2]) + (i + 1)
      let tmp = nowdate.split("-")
      tmp.splice(2, 1, last)
      tmp = tmp.join("-")
      arr.push(tmp)
    }
    arr = arr.map((e) => {
      return {
        time_name: e,
        id: e
      }
    })
    this.setData({
      'selectList[1].range': arr
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getActivityList(), this.getAddress(), this.getCategory(), this.DateList()])
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
    this.getActivityList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})