// pages/tabBar/order/index.js
let identity;//获取身份
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //厨师视角看到的是，自己处理过的所有的菜品的信息，以及未完成的
    previewLMRs: [{
      imagePath: "../../../resources/navBar/unselectedHome.png",
      midText: "测试菜品",
      rightText: "14￥",
      hasBtns: true,
      leftBtn: "../../../resources/navBar/unselectedMe.png",
      rightBtn: "../../../resources/navBar/unselectedOrder.png",
      num: 0,
      conditionForDisplay: true,//会在onLoad判定
    }, {
      imagePath: "../../../resources/navBar/unselectedHome.png",
      midText: "测试菜品",
      rightText: "14￥",
      hasBtns: true,
      leftBtn: "../../../resources/navBar/unselectedMe.png",
      rightBtn: "../../../resources/navBar/unselectedOrder.png",
      num: 0,
      conditionForDisplay: true,
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(3);
  },

  leftBtnHandler(e) {//厨师视角，将当前菜品的状态标记为已完成

  },

  rightBtnHandler(e) {//将当前菜品从记录中删除，但仅限已完成菜品

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