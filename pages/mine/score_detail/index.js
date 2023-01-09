import { request } from "../../../api/index"

// pages/mine/score_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopSelect:[{id:0,name:"积分获取"},{id:1,name:"积分兑换"}],
    current:0,
    // 积分兑换
    swapGetList:[
      {id:0,title:"转发商品阿松大",time:"2023-12-11 18:45:33",tag:"转发商品",score:10},
      {id:1,title:"个人信息认证",time:"2023-12-11 18:45:33",tag:"个人信息认证",score:5},
      {id:2,title:"个人信息认证",time:"2023-12-11 18:45:33",tag:"个人信息认证",score:5},
      {id:3,title:"个人信息认证",time:"2023-12-11 18:45:33",tag:"个人信息认证",score:5},
      {id:4,title:"个人信息认证",time:"2023-12-11 18:45:33",tag:"个人信息认证",score:5},
      {id:5,title:"个人信息认证",time:"2023-12-11 18:45:33",tag:"个人信息认证",score:5},
      {id:6,title:"个人信息认证",time:"2023-12-11 18:45:33",tag:"个人信息认证",score:5},
      {id:7,title:"个人信息认证",time:"2023-12-11 18:45:33",tag:"个人信息认证",score:5},
    ],
    recordList:[
      {id:0,title:"一次性医用口罩(儿童款)×10",time:"2023-12-11 18:45:33",tag:"购买商品",score:10},
    ],
    restScope:0,
  },
  // 获取积分明细
  async getList(){
    let res = await request("get","/user/integral")
    this.setData({
      swapGetList:res.data.history,
      recordList:res.data.order,
      restScope:res.data.integral
    })
  },
  changeSelect(e){
    this.setData({current:e.currentTarget.dataset.index})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
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