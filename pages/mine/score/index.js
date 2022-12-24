// pages/mine/score/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择
    tabs:[{id:0,name:"积分申请"},{id:1,name:"申请记录"}],
    current:0,//当前选择
    imageList:[],
    textarea:"",
  },
  changeTabs(e){
    this.setData({current:e.currentTarget.dataset.index})
  },
  // 选择图片
  chooseImage(){
    wx.chooseMedia({
      count:9,
      mediaType:['image'],
      success:(res)=>{
        let list = this.data.imageList
        for(let i = 0; i < res.tempFiles.length; i++){
          if(list.length >= 9) return
          list.push({id:i,...res.tempFiles[i]})
          this.setData({imageList:list})
        }
        console.log(this.data.imageList)
      }
    })
  },
  // 删除图片
  deleteImage(e){
    wx.showModal({
      title: '删除照片',
      content: '确认删除照片?',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          let list = this.data.imageList
          const index = list.findIndex(p=>p.id == e.currentTarget.dataset.id)
          list.splice(index,1)
          this.setData({imageList:list})
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