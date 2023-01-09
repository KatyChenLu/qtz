// pages/mine/my_activity/index.js
import {
  request
} from "../../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  go(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/activity_info/index?activity_id=' + id,
    })
  },
  // 取消报名
  cancelBaoming(e) {
    wx.showModal({
      title: '温馨提示',
      content: '是否取消报名',
      success: async (res) => {
        if (res.cancel) {
          return
        } else if (res.confirm) {
          let res = await request("post", "/activity/cancel", {
            apply_id: e.currentTarget.dataset.item.apply_id
          })
          if (res.code != 200) return
          wx.showToast({
            title: "取消报名成功",
            icon: "none",
            duration: 1000,
            complete: () => {
              setTimeout(() => {
                wx.hideToast()
              }, 1000)
              this.getList()
            }
          })
        }

        if (res.confirm) {

        }
      }
    })
  },
  // 微信扫一扫
  scanCode() {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ["qrCode"],
      success: (result) => {
        console.log(result)
      },
    })
  },
  // 获取我的活动
  async getList() {
    let res = await request('get', "/activity/mine")
    if (res.code != 200) return
    this.setData({
      list: res.data.list
    })
  },
  // 签到
  async signIn(activity_id,captcha){
    let res = await request("post","/activity/signIn",{activity_id,captcha})
    if(res!= 200) return
    wx.showModal({
      title: '温馨提示',
      content: '签到成功',
      showCancel:false,
      complete: (res) => {    
        if (res.confirm) {
          this.getList()
        }
      }
    })
  },
  async signOut(activity_id,captcha){
    let res = await request("post","/activity/signOut",{activity_id,captcha})
    if(res!= 200) return
    wx.showModal({
      title: '温馨提示',
      content: '签退成功',
      showCancel:false,
      complete: (res) => {    
        if (res.confirm) {
          this.getList()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getList()])
    if (options.scence !== undefined) {
      const str = decodeURIComponent(options.scene)
      const type = str.split(";")[0]
      const activity_id = str.split(';')[1]
      const captcha = str.split(";")[2]
      if(type == "signIn"){
        this.signIn(activity_id,captcha)
      } else if (type == "signOut"){
        this.signOut(activity_id,captcha)
      }
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