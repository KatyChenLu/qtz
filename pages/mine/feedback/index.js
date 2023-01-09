// pages/mine/feedback/index.js
import { request } from "../../../api/index"
import { checkEmpty, say } from "../../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:""
  },
  onChange(e){
    this.setData({detail:e.detail.value})
  },
  async confirm(){
    if(!checkEmpty(this.data.detail)) return say("内容不可为空") 
    let res = await request("post","/feedback/submit",{detail:this.data.detail})
    if(res.code != 200) return
    wx.showModal({
      title: '温馨提示',
      content: '意见提交成功',
      complete: (res) => {
        if (res.cancel) {
          wx.navigateBack()
        }
    
        if (res.confirm) {
          wx.navigateBack()
        }
      }
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