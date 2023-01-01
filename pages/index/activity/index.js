// pages/index/activity/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail:{
      type:Object,
      value:{
        activity_id:-1,
        activity_name:"",
        integral:0,
        image:"",
        start_time:"1970-10-10 10:10:10",
        address_short:""
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status:""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    go(){
      wx.navigateTo({
        url: '/pages/activity_info/index?activity_id='+this.data.detail.activity_id,
        fail:(err)=>{
          console.log(err)
        }
      })
    },
    setStatus(time){
      if(new Date(time).getTime() > new Date().getTime()) return "活动报名中"
      return "报名已结束"
    }
  },
  attached(){
    this.setData({status:this.setStatus(this.properties.detail.start_time)})
    
  }
})
