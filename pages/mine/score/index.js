// pages/mine/score/index.js
import { request } from "../../../api/index"
import { baseUrl } from "../../../api/config"
import { checkEmpty, say } from "../../../utils/util"
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
    unit:[],
    nowUnit:"",
    unit_id:-1,
    uploadImageList:[],//用于上传的图片
    scoreList:[],//积分记录
  },
  // 获取积分申请记录
  async getScoreList(){
    let res = await request("get","/integral/knowList")
    this.setData({scoreList:res.data.list})
  },
  // 积分认定
  async scoreSubmit(){
    if(!checkEmpty(this.data.textarea)) return say("提交建议不可为空")
    let res = await request("post","/integral/know",{
      unit_id:this.data.unit_id,
      know_describe:this.data.textarea,
      images:this.data.uploadImageList
    })
    if(res.code != 200) return
    wx.showModal({
      title: '温馨提示',
      content: '提交成功',
      showCancel:false,
      complete: (res) => {   
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/mine/index',
          })
        }
      }
    })
  },
  // 修改单位
  changeUnit(e){
    this.setData({nowUnit:this.data.unit[e.detail.value].unit_name,unit_id:this.data.unit[e.detail.value].unit_id})
    // this.setData()
  },
  changeTabs(e){
    this.setData({current:e.currentTarget.dataset.index})
  },
  // 输入描述
  onInput(e){
    this.setData({textarea:e.detail.value})
  },
  // 选择图片
  chooseImage(){
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      success:async (res)=>{
         wx.uploadFile({
           filePath: res.tempFiles[0].tempFilePath,
           name: 'image',
           url: `${baseUrl}/upload/image`,
           header:{
            "c-access-token": wx.getStorageSync('token') || ''
           },
           success:(res_1)=>{
             const data = JSON.parse(res_1.data).data
              this.setData({
                imageList:[...this.data.imageList,data.full_url],
                uploadImageList:[...this.data.uploadImageList,data.url]
              })
           },
         })
      }
    })
  },
  // 获取负责单位
 async getUnit(){
  let res = await request("get","/area/charge")
  this.setData({unit:res.data})
  this.setData({nowUnit:this.data.unit[0].unit_name,unit_id:this.data.unit[0].unit_id})
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
          const index = e.currentTarget.dataset.index
          let list = this.data.imageList
          list.splice(index,1)
          let uploadList = this.data.uploadImageList
          uploadList.splice(index,1)
          this.setData({imageList:list,uploadImageList:uploadList})

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Promise.all([this.getUnit(),this.getScoreList()])
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