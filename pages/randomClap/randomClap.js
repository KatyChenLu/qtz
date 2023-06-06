// import util from "../../../../utils/util";
const app = getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../api/config')
var util = require('../../utils/util.js')
var upFiles = require('../../utils/upFiles.js')
import { checkEmpty, say } from "../../utils/util"
import { baseUrl } from '../../api/config'
import { request } from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameValue:'',
    mobileValue:'',
    subInfo:{},
    typeName:'',
    selectImg: "/images/scoreShop/select.png",
    selectedImg: "/images/scoreShop/selected.png",
    oldValue: '',
    region: [],
    checked: false,
    shpArray: ['好人好事', '文明提倡'],
    upFilesBtn: true,
    upFilesProgress: false,
    maxUploadLen: 6,
    isSelect: false,
    imageList:[],
    uploadImageList:[],//用于上传的图片
    src: "",        // 上传视频
    textarea:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.oldValue) { // 编辑
      let oldValue = JSON.parse(options.oldValue);
      console.log('编辑值', oldValue)
      this.setData({
        oldValue,
        zipCode: oldValue.zipCode,
        region: [oldValue.province, oldValue.city, oldValue.area],
        isDefault: oldValue.isDefault == 1 ? true : false,
      })
    } else { // 新增
      wx.setNavigationBarTitle({
        title: '我要爆料',
      })
      var loginInfo = wx.getStorageSync('loginInfo');

      this.setData({
        jumpFlag: options.jumpFlag ? options.jumpFlag : '',
        loginInfo: loginInfo
      })

    }
  },
  select: function () {
    var that = this;
    this.setData({
      isSelect: !that.data.isSelect
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this
    that.setData({
      index: e.detail.value,
      typeName:that.data.shpArray[e.detail.value]
    })
  },
  /**************************************************************
   Function name: bindRegionChange
    Description: 选择省市区
    Param: 参数说明
          【in】
          【in】
          【out】
    Return : 返回值
            0: 失败
            1: 成功
  *******************************************************************/
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    }, () => {
      //   console.log(this.data.region)
    })
  },
  /**************************************************************
    Function name: ischecked
    Description: 修改是否默认
    Param: 参数说明
          【in】
          【in】
          【out】
    Return : 返回值
            0: 失败
            1: 成功
  *******************************************************************/
  ischecked() {
    this.setData({
      isDefault: !this.data.isDefault
    })
  },
  /**************************************************************
   Function name: submit
    Description: 点击保存（新增或者编辑）
    Param: 参数说明
          【in】
          【in】
          【out】
    Return : 返回值
            0: 失败
            1: 成功
  *******************************************************************/
  submit(e) {
    // wx.navigateTo({
    //   url: '/pages/scoreShop/sendResult',
    // })
    console.log('表单信息--', e)
    let that = this
    // if (that.data.checked) {
    //   data.status = 1
    // }
    let value = e.detail.value
    let data = {
      postName: value.name,
      postMobile: value.phone,
      detailAddress: value.address,
      zipCode: value.code ? value.code : '',
      province: that.data.region[0],
      city: that.data.region[1],
      area: that.data.region[2],
      createTime: '',
      isDefault: that.data.isDefault ? 1 : 0,
      label: '其他',
      memberId: that.data.loginInfo.memberId,
      mobileNo: that.data.loginInfo.mobileNo,
      state: 1
    }



    let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (data.name == '') {
      wx.showToast({
        title: '请留下您的姓名或昵称',
        icon: 'none'
      })
      return
    }
    console.log('value.phone', value.phone)
    if (!phoneReg.test(value.phone)) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
      return
    }
    if (this.data.region.length == 0 || data.detailAddress == '') {
      wx.showToast({
        title: '请留下正确地址',
        icon: 'none'
      })
      return
    }

    if (this.data.oldValue) { //编辑
      data.id = this.data.oldValue.id
      that.editAddress(data)
    } else { //新增
      that.addAddress(data)
    }
  },
  /**************************************************************
   Function name: addAddress
    Description: 新增地址
    Param: 参数说明
          【in】
          【in】
          【out】
    Return : 返回值
            0: 失败
            1: 成功
  *******************************************************************/
  addAddress(data) {

    let that = this;
    util.ajax({
      url: '/api/postAddress/saveOrUpdate',
      type: 'POST',
      data: data,
      success(res) {
        console.log("addAddress======", res)
        if (res.code == 'C0') {
          wx.setStorageSync('selectedAddress', res.data)
          //新增成功返回上一页
          wx.navigateBack({
            delta: 1
          })



        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  /**************************************************************
   Function name: editAddress
    Description: 编辑地址
    Param: 参数说明
          【in】
          【in】
          【out】
    Return : 返回值
            0: 失败
            1: 成功
  *******************************************************************/
  editAddress(data) {
    util.ajax({
      url: '/api/postAddress/saveOrUpdate',
      type: 'POST',
      data: data,
      success(res) {
        console.log("editAddress======", res)
        if (res.code == 'C0') {
          wx.showToast({
            title: '修改成功',
            icon: 'none'
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  onShow: function () {
    var loginInfo = wx.getStorageSync('loginInfo');
    this.setData({
      loginInfo: loginInfo,
    })
  },
  verifyPhone() {
    let phoneReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/;
  },

    // 点击添加选择
    chooseSource: function () {
      var _this = this;
      wx.showActionSheet({
        itemList: ["拍照", "从相册中选择"],
        itemColor: "#000000",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              _this.imgWShow("camera")        //拍照
            } else if (res.tapIndex == 1) {
              _this.imgWShow("album")      //相册
            }
          }
        }
      })
    },
    // 点击调用手机相册/拍照
    imgWShow: function (type) {
      var _this = this;
      let len = 0;
      if (_this.data.imgList != null) {
        len = _this.data.imgList.length
      }   //获取当前已有的图片
      wx.chooseImage({
        count: 1,     //最多还能上传的图片数,这里最多可以上传5张
        sizeType: ['original', 'compressed'],        //可以指定是原图还是压缩图,默认二者都有
        mediaType:['image'],
        sourceType: [type],             //可以指定来源是相册还是相机, 默认二者都有
        success:async (res)=>{
          wx.uploadFile({
            filePath: res.tempFiles[0].path,
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
            fail(err){
              console.log(err)
            }
          })
       },
        fail: function () {
          wx.showToast({
            title: '图片上传失败',
            icon: 'none'
          })
          return;
        }
      })
    },

   
    // 预览图片
    previewImg: function (e) {
      let index = e.target.dataset.index;
      let _this = this;
      wx.previewImage({
        current: _this.data.imgList[index],
        urls: _this.data.imgList
      })
    },
    /**
     * 点击删除图片
     */
    deleteImg: function (e) {
      var _this = this;
      var imgList = _this.data.imgList;
      var index = e.currentTarget.dataset.index;      //获取当前点击图片下标
      wx.showModal({
        title: '提示',
        content: '确认要删除该图片吗?',
        success: function (res) {
          if (res.confirm) {
            console.log("点击确定了")
            imgList.splice(index, 1);
          } else if (res.cancel) {
            console.log("点击取消了");
            return false
          }
          _this.setData({
            imgList
          })
        }
      })
    },
    /**
     * 点击删除视频
     */
    deleteVideo: function(e) {
      var _this = this;
      var src = _this.data.src;
      var index = e.currentTarget.dataset.index;      //获取当前点击图片下标
      wx.showModal({
        title: '提示',
        content: '确认要删除该视频吗?',
        success: function (res) {
          if (res.confirm) {
            console.log("点击确定了")
            var unsrc = '';
            _this.setData({
              src: unsrc
            })
          } else if (res.cancel) {
            console.log("点击取消了");
            return false
          }
        }
      })
    },
    /**
     * 图片  视频 选择框
     */
    actioncnt: function() {
      var _this = this;
      wx.showActionSheet({
        itemList: ['图片', '视频'],
        success: function(res) {
          if(res.tapIndex == 0) {
            _this.chooseSource()
          }
          if(res.tapIndex == 1) {
            _this.chooseVideo()
          }
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    },
    /**
     * 选择视频
     */
    chooseVideo: function() {
      var _this = this;
    
      wx.chooseVideo({
        
        success:async (res)=>{
          _this.setData({
            src: res.tempFilePath,
          })
          wx.uploadFile({
            filePath: res.tempFilePath,
            name: 'files',
            url: `${baseUrl}/upload/image`,
            header:{
             "c-access-token": wx.getStorageSync('token') || ''
            },
            success:(res_1)=>{
              console.log('视频上传成功')
              const data = JSON.parse(res_1.data).data
               this.setData({
                 imageList:[...this.data.imageList,data.full_url],
                 uploadImageList:[...this.data.uploadImageList,data.url]
               })
            },
            fail(err){
              console.log(err)
              console.log('接口调用失败')
            }
          })
       },
        fail: function () {
          wx.showToast({
            title: '图片上传失败',
            icon: 'none'
          })
          return;
        }
      })
    },
    /**
     * 上传视频 目前后台限制最大100M, 以后如果视频太大可以选择视频的时候进行压缩
     */
    uploadvideo: function() {
      var src = this.data.src;
      wx.uploadFile({
        url: '',
        methid: 'POST',           // 可用可不用
        filePath: src,
        name: 'files',              // 服务器定义key字段名称
        header: app.globalData.header,
        success: function() {
          console.log('视频上传成功')
        },
        fail: function() {
          console.log('接口调用失败')
        }
      })
    },
    bindtext: function(e) {
      this.setData({
        textarea: e.detail.value
      })
    },
    getPhoneNumber (e) {
      console.log(e.detail.code)
      //https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/phone-number/getPhoneNumber.html
    },
    subinfo(e){
      const type = e.currentTarget.dataset.type
      if (type === 'name') {
        this.setData({
          "subInfo.name": e.detail.value
        })
      } else if(type === 'phone') {
        this.setData({
          "subInfo.phone": e.detail.value
        })
      }
    },
async confirm(){
  if(!checkEmpty(this.data.textarea)) return say("内容不可为空") 
  if(!checkEmpty(this.data.subInfo.name)||!this.data.subInfo.name) return say("姓名不可为空") 
  if(!checkEmpty(this.data.subInfo.phone)||!this.data.subInfo.phone) return say("手机号不可为空") 
  if(!checkEmpty(this.data.address)||!this.data.address) return say("位置不可为空") 
  let res = await request("post","/feedback/submit",{
    username:this.data.subInfo.name,
    phone:this.data.subInfo.phone,
    address:this.data.region.join(),
    type_name:this.data.shpArray[this.data.index],
    detail:this.data.textarea,
    image:this.data.uploadImageList,
    is_anonymouns:this.data.isSelect
    // video
  })
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
})