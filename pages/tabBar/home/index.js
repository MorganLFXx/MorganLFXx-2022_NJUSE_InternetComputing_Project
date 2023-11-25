// pages/tabBar/home/index.js
import {ItemOfPerson, Campus, CampusName, Canteen, CanteenName, Window, WindowName} from "../../enumerations"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //previewLMRs: [],//用于存储从后端数据库中加载而来的菜品信息
    //测试数据:
    previewLMRs: [{

    }, {

    }],
    pickers:[{
      itemIndex: ItemOfPerson.campus,
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
    isReady: false,//判断三个筛选栏是否筛选完毕
    isRight: false,//判断三个筛选栏的排列是否正确
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