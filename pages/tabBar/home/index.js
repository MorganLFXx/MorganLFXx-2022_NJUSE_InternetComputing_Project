// pages/tabBar/home/index.js
import {
  ItemOfPerson,
  Campus,
  CampusName,
  Canteen,
  CanteenName,
  Window,
  WindowName
} from "../../enumerations"

let identity; //于onLoad函数中从后端把身份加载出来

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //previewLMRs: [],//用于存储从后端数据库中加载而来的菜品信息
    //测试数据: conditionForDisplay放于了onLoad函数中，注意，左右按钮的图标机器绑定的函数会随着用户访问的身份不同而发生变化 --ykg
    previewLMRs: [{
      imagePath: "../../../resources/navBar/unselectedHome.png",
      midText: "测试菜品",
      rightText: "14￥",
      hasBtns: true,
      leftBtn: "../../../resources/navBar/unselectedMe.png",
      rightBtn: "../../../resources/navBar/unselectedOrder.png",
      num: 0,
    }, {
      imagePath: "../../../resources/navBar/unselectedHome.png",
      midText: "测试菜品",
      rightText: "14￥",
      hasBtns: true,
      leftBtn: "../../../resources/navBar/unselectedMe.png",
      rightBtn: "../../../resources/navBar/unselectedOrder.png",
      num: 0,
    }],
    pickers: [{
      itemIndex: ItemOfPerson.campus, //判断是筛选什么 --ykg，于changeHandler中调用
      hint: "校区筛选",
      selections: Object.getOwnPropertyNames(Campus),
    }, {
      itemIndex: ItemOfPerson.canteen,
      hint: "食堂筛选",
      selections: Object.getOwnPropertyNames(Canteen),
    }, {
      itemIndex: ItemOfPerson.window,
      hint: "窗口筛选",
      selections: Object.getOwnPropertyNames(Window),
    }],
    isReady: false, //判断三个筛选栏是否筛选完毕
    isRight: false, //判断三个筛选栏的排列是否正确
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  leftBtnHandler(e) {
    if (identity) { //厨师身份，进行删除

    } else {
      dishIndex = parseInt(e.currentTarget.dataset.index);
      var previewLMRs = this.data.previewLMRs;
      previewLMRs[dishIndex].num = previewLMRs[dishIndex].num + 1;
      this.setData({
        previewLMRs: previewLMRs,
      })
    }
  },

  rightBtnHandler(e) {
    if (identity) { //厨师身份，进行修改

    } else {
      dishIndex = parseInt(e.currentTarget.dataset.index);
      var previewLMRs = this.data.previewLMRs;
      previewLMRs[dishIndex].num = previewLMRs[dishIndex].num - 1;
      this.setData({
        previewLMRs: previewLMRs,
      })
    }
  },

  changeHandler() {
    //todo
  },

  tapHandler() {
    //todo
  },

  toSettleAccounts() {
    //todo: 将当前所选择的菜品，发送至后端，包括菜品的数量和在数组中的索引

    //跳转至结算页面
    wx.redirectTo({
      url: '../../home/settleAccounts',
    });
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