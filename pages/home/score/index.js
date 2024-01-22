// pages/home/score/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hint: '欢迎在这里畅所欲言，说出你对该菜品的意见或建议！',
    text: '',
    isEmpty: true,
    isStandard: false,
    isSubmitted: false,
    pickers: [{
      itemIndex: 100,
      value: 9,
      hint: "评分",
      selections: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      conditionForDisplay: true,
    }],
    userID: "", //从onLoad获取
    value: "",
    windowNo: "",
    orderID: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      userID: options.userID,
      windowNo: options.windowNo,
      orderID: options.orderID,
    })
  },

  inputHandler(e) {
    this.setData({
      value: e.detail.value,
      isEmpty: e.detail.value === '',
    })
  },

  async changeHandler(event) {
    const value = event.detail.value;
    var pickers = this.data.pickers;
    pickers[0].value = value;
    this.setData({
      pickers: pickers,
    })
  },

  submit() {
    var order;
    wx.cloud.callFunction({
      name: "order",
      data: {
        type: "inquireSpecificOrders",
        orderNo: this.data.orderID, 
      }
    }).then((res)=>{
      console.log(res);
      order = res.result.order;
      const dishes = order.Dishes;
      const timeInfo = new Date();
      for(var i = 0;i<dishes.length;i++){
        wx.cloud.callFunction({
          name: "order",
          data:{
            type: "updateScore",
            windowNo: this.data.windowNo,
            ID: dishes[i].ID,
            score: this.data.pickers[0].selections[this.data.pickers[0].value],
          }
        }).then((res)=>{
          console.log(res)
        }).catch((e)=>{
          console.error(e)
        })
        
      }
      for(var i = 0;i<dishes.length;i++){
        wx.cloud.callFunction({
          name: "order",
          data: {
            type: "addComment",
            windowNO: this.data.windowNo,
            dishID: dishes[i].ID,
            comment: this.data.value,
            time: timeInfo,
          }
        }).then((res)=>{
        })
      }
      this.setData({
        isSubmitted: true,
      })
    })
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