// pages/activity_info/index.js
import {
  checkEmpty,
  checkPhone,
  say
} from "../../utils/util"
import {
  request
} from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baoming_name: "",
    baoming_phone: "",
    score: 0,
    show: false,
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
    ],
    activity: {
      "detail": {
        "activity_name": "", //活动名称
        "activity_id": 1, //活动id
        "integral": 50, //每小时获得的积分
        "num_people": 6, //最大人数
        "image": "", //图片
        "address_short": "医院", //地址简称
        "address_long": "东莞市X村茶山医院", //详细地址
        "start_time": "2022-12-27 20:55:12", //开始时间
        "end_time": "2022-12-30 20:55:18", //结束时间
        "longitude": 113.31, //经度
        "latitude": 22.39, //纬度
        "content": "<h1></h1>", //富文本
        "images": [
          "http://localhost:9501/images/test.png",
          "http://localhost:9501/images/test.png"
        ] //多图
      },
      "is_apply": 1, //1本人已经报名  0未报名
      "apply_num": 1 //已经报名人数
    }
  },
  // 打开详情
  openDetail(e) {
    if(e.currentTarget.dataset.status == 1) return
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
      latitude: this.data.activity.detail.latitude, //维度
      longitude: this.data.activity.detail.longitude, //经度
      name: this.data.activity.detail.address_short,
      scale: 15,
      address: this.data.activity.detail.address_long
    })
  },
  // 获取活动详情
  async getActivityDetail(activity_id) {
    let res = await request("get", "/activity/detail", {
      activity_id
    })
    if (res.code != 200) return
    this.setData({
      activity: res.data
    })
    this.setData({
      'infoList[0].name': this.data.activity.detail.address_short,
      "infoList[1].name": this.data.activity.detail.start_time,
      "infoList[2].name": this.data.activity.detail.end_time
    })
    let rest = parseInt((new Date(this.data.activity.detail.end_time).getTime() - new Date(this.data.activity.detail.start_time).getTime()) / 1000 / 60 / 60)
    this.setData({
      score: rest * this.data.activity.detail.integral
    })
  },
  // 活动报名人姓名
  getName(e) {
    if (e.detail.value.length >= 10) return
    this.setData({
      baoming_name: e.detail.value
    })
  },
  // 获取报名电话
  getPhone(e) {
    if (e.detail.value.length > 13) return
    this.setData({
      baoming_phone: e.detail.value
    })
  },
  // 提交信息
  async submit(){
    if(!checkEmpty(this.data.baoming_name)) return say("名字格式不正确") 
    if(!checkPhone(this.data.baoming_phone)) return say("手机格式不正确")
    let res = await request("post","/activity/apply",{
      activity_id:this.data.activity.detail.activity_id,
      apply_name:this.data.baoming_name,
      apply_phone:this.data.baoming_phone
    })
    if(res.code != 200) return
    say("报名成功")
    wx.redirectTo({
      url: '/pages/mine/my_activity/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.activity_id === undefined) return wx.switchTab({
      url: '/pages/index/index',
    })
    this.getActivityDetail(options.activity_id)
    const demo = this.createSelectorQuery().select('.progress-in').boundingClientRect()
    demo.exec((res) => {
      this.setData({
        progressWidth: res[0].width * (this.data.activity.apply_num / this.data.activity.detail.num_people)
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