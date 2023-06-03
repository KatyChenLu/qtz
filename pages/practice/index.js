// pages/practice/index.js
import {
  request
} from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    pageSize: 20,
    list: [],
    activityConfig: {
      page: 1,
      pageSize: 10,
      list: []
    },
    selectList: [{
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
        rangeKey: 'category_name'
      },
    ],
    isLoading: false
  },
  // 前往实践内页
  go(e) {
    wx.navigateTo({
      url: '/pages/practice/pratice_detail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  // 获取实践动态文章列表
  async getArticle() {
    if (this.data.isLoading) return
    this.setData({
      isLoading: true
    })
    let res = await request("get", "/practice/list", {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    })
    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    }, 1000)
    if (res.code != 200) return
    if (res.data.list.length === 0) return
    this.setData({
      list: [...this.data.list, ...res.data.list],
      pageNum: ++this.data.pageNum
    })
  },
  // 确认
  confirm(e) {
    const index = e.currentTarget.dataset.id
    console.log('index,index',index)
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
       'selectList[1].name': this.data.selectList[0].range[index].time_name
     })
     this.setData({
       'config.start_time': this.data.selectList[0].range[index].time_name
     })
    } else if (index === 2) {
      const index = parseInt(e.detail.value)
      this.setData({
        'selectList[1].name': this.data.selectList[1].range[index].category_name
      })
      this.setData({
        'config.category_id': this.data.selectList[1].range[index].category_id
      })
    }

    this.inCategoryList()
  },
  // 分类时的请求
  async inCategoryList() {
    let res = await request("get", "/practice/list", {
      pageSize: 10,
      pageNum: 1,
      ...this.data.config
    })
    this.setData({
      'activityConfig.list': [...res.data.list]
    })

  },
   // 获取分类
   async getCategory() {
    let res = await request("get", "/practice/category")
    if (res.code != 200) return
	
    this.setData({
      'selectList[1].range': res.data
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
        'selectList[0].range': arr
      })
  
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getArticle()
    Promise.all([this.getCategory(),this.DateList()])
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
    this.getArticle()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})