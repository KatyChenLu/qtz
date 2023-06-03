import {
  request
} from "../../api/index"
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 防抖
    isLoading: false,
    // 活动列表配置
    activityConfig: {
      page: 1,
      pageSize: 10,
      list: []
    },
    // 轮播图
    swiperList: [],
    // 轮播图下方的选项
    contentList: [{
        id: 0,
        url: "/static/xwzx.png",
        name: "实践动态",
        path: "/pages/practice/index"
      },
      {
        id: 4,
        url: "/static/bzdt.png",
        name: "随手拍",
        path: "/pages/randomClap/randomClap"
      },
    {
      id: 1,
      url: "/static/bzdt.png",
      name: "积分排行",
      path: "/pages/score_rank/index"
    },
      {
        id: 2,
        url: "/static/hdzx.png",
        name: "实践阵地",
        path: "/pages/pratice_place/index"
      },
      {
        id: 3,
        url: "/static/smfw.png",
        name: "志愿服务",
        path: "/pages/volunteer/index"
      }
    ]
  },
  // 获取轮播图和内容
  async getContent() {
    let res = await request("get", "/settings/home")
    if (res.code != 200) return
    this.setData({
      swiperList: res.data.slideshow,
      "contentList[0].url": res.data.first_icon,
      "contentList[1].url": res.data.second_icon,
      "contentList[2].url": res.data.third_icon,
      "contentList[3].url": res.data.fourth_icon,

    })
  },
  goSelect(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path,
    })
  },
  // 获取活动列表
  async getActivityList() {
    if (this.data.isLoading) return
    this.setData({
      isLoading: true
    })
    let res = await request("get", "/activity/list", {
      pageNum: this.data.activityConfig.page,
      pageSize: this.data.activityConfig.pageSize
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
  onLoad() {
    Promise.all([this.getContent(), this.getActivityList()])

  },
  onReachBottom() {
    this.getActivityList()
  }
})