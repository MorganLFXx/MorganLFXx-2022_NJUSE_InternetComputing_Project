// pages/order/orderDetails/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      previewLMRs: [{
        index: 0,//它在当前数组的下标
        imagePath: "../../../resources/navBar/unselectedHome.png",
        midText: "测试菜品14￥",
        price: 14,
        rightText: 0,
        id: "1111111111",
        hasBtn: false,
        leftBtn: "../../../resources/navBar/unselectedMe.png",
        rightBtn: "../../../resources/navBar/unselectedOrder.png",
        conditionForDisplay: true,//会在onLoad判定
      }, {
        index: 1,
        imagePath: "../../../resources/navBar/unselectedHome.png",
        midText: "测试菜品14￥",
        price: 14,
        rightText: 0,
        id: "1111111111",
        hasBtn: false,
        leftBtn: "../../../resources/navBar/unselectedMe.png",
        rightBtn: "../../../resources/navBar/unselectedOrder.png",
        conditionForDisplay: true,
      }],
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