export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 提示状态
export function say(title = "提示", duration = 800, mask = false, icon = "none") {
  return wx.showToast({
    title,
    duration,
    mask,
    icon
  })
}

// 验证验证码
export function checkCode(code) {
  return /^([a-zA-z0-9]){5}$/.test(code)
}
// 校验身份证
export function checkIdCard(idcard) {
  // return /(^([1-9]\d{5})(([\d]{2}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-8])))))|((([02468][048])|([13579][26]))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-9]))))))(\d{3})$)|(^(((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4})(([\d]{4}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-8])))))|((((([02468][048])|([13579][26]))00)|([0-9]{2}(([02468][048])|([13579][26]))))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-9]))))))((\d{4})|(\d{3}[Xx]))$)/.test(idcard)

  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idcard)
}
// 校验手机
export function checkPhone(phone) {
  return /^1[3456789]{1}\d{9}$/.test(phone)
}
// 校验是否为空
export function checkEmpty(str){
  return /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(str)
}
