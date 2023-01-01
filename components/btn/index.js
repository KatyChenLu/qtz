// components/btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    is_fixed: {
      type: String,
      value: "bottom: 31rpx;left: 50%;position: fixed;transform: translateX(-50 % );"
    },
    width: {
      type: String,
      value: "688rpx"
    },
    in_width: {
      type: String,
      value: "680rpx"
    },
    color: {
      type: String,
      color: "#ffffff"
    },
    backgroundColor: {
      type: String,
      value: "#1E948A"
    }
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

  }
})