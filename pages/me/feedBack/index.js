// pages/me/feedBack/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hint: "欢迎在这里畅所欲言，说出你对小程序的需求、意见或建议！",
    text: "",
    isEmpty: true,
    isSubmitted: false,
    value: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  inputHandler(e) {
    this.setData({
      value: e.detail.value,
      isEmpty: e.detail.value === "",
    });
  },

  submit() {
    //todo 向后端发送数据
    wx.cloud
      .callFunction({
        name: "me",
        data: {
          type: "sendFeedback",
          feedbackContent: this.data.value,
        },
      })
      .then((res) => {
        console.log(res);
      });
    this.setData({
      isSubmitted: true,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
