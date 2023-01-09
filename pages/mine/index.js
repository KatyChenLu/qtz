// pages/mine/index.js
import {
  request
} from "../../api/index"
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
    userInfo: {
      // 用户信息
      avatarUrl: "",
      nickName: "",
      phone: "",
      is_family: 0, //是否完善家庭
      is_perfect: 0, //是否完善资料
      create_name: "", //家庭名称
      integral: 0, //总积分
      annualIntegral: 40, //年度积分
      sex: 1, //性别 1为男 2为女
      contact_numbe: "", //联系电话
      area_id: 0, //区域id
      contact_address: "", //联系地址
      idCard: "", //身份证号码
      eme_contact: "", //紧急联系人
      eme_phone: "" //紧急联系人电话
    }
  },
  // 前往用户信息
  goUser(e) {
    const index = e.currentTarget.dataset.index
    if (index == 0) return wx.navigateTo({
      url: '/pages/mine/user/index',
    })
    if (index == 1) return wx.navigateTo({
      url: '/pages/mine/my_activity/index',
    })
    if (index == 2) return wx.navigateTo({
      url: '/pages/mine/score/index',
    })
    if (index == 3) return wx.navigateTo({
      url: '/pages/mine/swap/index',
    })
    if (index == 4) return wx.navigateTo({
      url: '/pages/mine/address/index',
    })
    if (index == 5) return wx.scanCode({
      scanType: ["qrCode"],
      success: (res) => {
        console.log(res)
      }
    })
    if (index == 6) return wx.navigateTo({
      url: '/pages/mine/feedback/index',
    })

  },
  // 查看积分明细
  checkScore() {
    wx.navigateTo({
      url: '/pages/mine/score_detail/index',
    })
  },
  // 创建家庭
  goCreateFamily() {
    wx.navigateTo({
      url: '/pages/mine/family/index',
    })
  },
  // 前往我的家庭
  goMyFamily(){
    wx.navigateTo({
      url: '/pages/mine/family/detail/index',
    })
  },
  // 获取用户信息
  async getUserInfo() {
    let res = await request("get", "/user/info")
    if (res.code != 200) return
    this.setData({
      userInfo:res.data.userInfo
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
    // return
    const token = wx.getStorageSync('token')
    if (token === "") {
      wx.redirectTo({
        url: '/pages/login/index',
      })
    } else {
      this.getUserInfo()
    }
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