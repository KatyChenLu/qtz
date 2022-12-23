// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图
    swiperList:[
      {id:0,color:"red"},
      {id:1,color:"pink"},
      {id:2,color:"orange"},
    ],
    // 轮播图下方的选项
    contentList:[
      {id:0, url:"/static/xwzx.png",name:"实践动态",path:"/pages/practice/index"},
      {id:1,url:"/static/bzdt.png",name:"积分排行",path:"/pages/score_rank/index"},
      {id:2,url:"/static/hdzx.png",name:"实践阵地",path:"/pages/pratice_place/index"},
      {id:3,url:"/static/smfw.png",name:"志愿服务",path:"/pages/volunteer/index"}
    ]
  },
  goSelect(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.path,
    })
  },
  onLoad() {
  },
})
