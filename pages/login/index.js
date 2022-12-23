// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:60,//验证码倒计时
    isGetting:false, //是否正在获取验证码
  },
    // 获取验证码
  getCode(){
    console.log(111)
    this.setData({isGetting:true})
    setTimeout(() => {
     this.setData({count:this.data.count--}) 
    });
    let timer = setInterval(() => {
      if(this.data.count > 1) {
        this.setData({count:--this.data.count})
      }else{
        this.setData({isGetting:false,count:60})
        clearInterval(timer)
      }
    }, 1000);
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