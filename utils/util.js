export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 提示状态
export function say(title="提示",duration=800,mask=false,icon="none"){
  return wx.showToast({title,duration,mask,icon})
}

// 验证验证码
export function checkCode(code){
	return /^([a-zA-z0-9]){5}$/.test(code)
}

// 校验手机
export function checkPhone(phone) {
	return /^1[3456789]{1}\d{9}$/.test(phone)
}

