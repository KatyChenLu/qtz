import {
  baseUrl
} from "./config"
import {
  say
} from "../utils/util"
/** 
 *@params type 请求类型
 *@params url 请求地址
 *@params data 请求数据
 *@params {Boolean} 
 **/

export function request(type, url, data = {}, load = false) {
  return new Promise((resolve, reject) => {
    if (load) wx.showLoading({
      title: '加载中',
      mask: true
    })
    let final_url = 'https://if.shanyuekj.com/client_api' + url
    wx.request({
      url: final_url,
      method: type,
      data,
      header: {
        "c-access-token": wx.getStorageSync('token') || ''
      },
      success: (res) => {
        if (res.statusCode == 200) {
          if (res.data.code == -1) {
            wx.redirectTo({
              url: "/pages/login/index"
            })
            // 未登录
            reject(res)
          } else if (res.data.code == -2) {
            say("用户未实名")
            reject(res)
          } else if (res.data.code == 100) {
            say(res.data.msg)
            reject(res)
          } else if (res.data.code == 102) {
            say("改ip已被封禁")
            reject(res)
          } else {
            resolve(res.data)
          }
        } else {
          switch (res.statusCode) {
            case 500:
              say("服务器内部错误")
              break;
            case 404:
              say("该页面不存在")
              break;
            case 403:
              say("网络请求不存在")
              break;
            case 401:
              say("很抱歉，用户信息不存在或已删除")
              // break;
            default:
              say("服务器繁忙，请稍后再试")
          }
          reject(res)
        }
      },
      fail:(err)=>{
        say("网络超时:"+err.errMsg)
      },
      complete:(res)=>{
        if(load) wx.hideLoading()
        console.log(`请求:${url};方法:${type};`,res)
      }
    })
  })
}