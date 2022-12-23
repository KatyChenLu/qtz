// pages/index/activity/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    go(){
      wx.navigateTo({
        url: '/pages/activity_info/index',
        fail:(err)=>{
          console.log(err)
        }
      })
    }
  }
})
