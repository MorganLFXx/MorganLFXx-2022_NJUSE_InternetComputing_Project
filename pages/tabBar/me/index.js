// pages/tabBar/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    previewLRs:[{
      imagePath: "",//到时候用云存储的路径，节省主包空间
      rightText: "",
      page: "",
    }, {
      imagePath: "",
      rightText: "",
      page: "feedBack",
    }],
  },

  tapHandler(e) {
    eventIndex = parseInt(e.currentTarget.dataset.index);
    switch(eventIndex){
      //todo:根据不同的页面索引进行不同的操作
    }
  },

  toEditInfo() {
    //跳转至编辑页面
    wx.navigateTo({
      url: `../../me/feedBack/index?identity=$`,//需要传递一个身份参数
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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