// pages/home/editInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastPreview: "",
    lastImg:"",//其url从onLoad函数中载入
    isReady:false,
    isSubmit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {//获取从tabBar页面传递过来的图片和简介
    lastImgUrl = options.lastImgUrl;
    lastPreviewHash = options.lastPreviewHash;
    //从后端将对应hash值的简介，读取出来
    var lastPreview;
    this.setData({
      lastImg: lastImgUrl,
      lastPreview: lastPreview,
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