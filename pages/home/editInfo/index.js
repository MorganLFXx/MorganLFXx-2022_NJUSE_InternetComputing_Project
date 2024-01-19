// pages/home/editInfo/index.js
import {lastImgStoragePath} from "../../enumerations.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishID: "",
    lastImg:"",//其url从onLoad函数中载入
    lastPreview: "",
    isReady:false,
    isSubmit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {//获取从tabBar页面传递过来的图片和简介
    //从后端将对应hash值的简介，读取出来
    var id = options.dishID
    if(id == "1111111111"){//广播地址：新增菜品
      this.setData({
        lastImg: lastImgStoragePath,
      })
    } else {
      this.setData({
        dishID: id,//获取dishID
      })
      //todo 调用云函数
    }
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