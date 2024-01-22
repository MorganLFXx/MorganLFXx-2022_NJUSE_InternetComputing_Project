// pages/tabBar/order/index.js
import {
  readyImgPath,
  unreadyImgPath
} from "../../enumerations.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //厨师视角看到的是，自己处理过的所有的菜品的信息，以及未完成的
    previewLRs: [
      //   {
      //   index: 0,
      //   id: "111111",//订单id
      //   imagePath: "",
      //   rightText: "测试菜品14￥",
      //   conditionForDisplay: true,//会在onLoad判定
      //   status: false,
      // }, {
      //   index: 1,
      //   id: "111111",//订单id
      //   imagePath: "../../../resources/navBar/unselectedHome.png",
      //   rightText: "测试菜品14￥",
      //   conditionForDisplay: true,
      //   status: false,//标记状态
      // }
    ],
    isChef: false,
    userID: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userID;
    wx.cloud.callFunction({
      name: "me",
      data: {
        type: "matchAccount",
      }
    }).then((res) => {
      userID = res.result.User_id
      var isChef = false;
      console.log(userID)
      if (userID.startsWith("888")) isChef = true;
      wx.cloud.callFunction({
        name: "order",
        data: {
          type: "inquireOrders",
          User_id: userID,
        }
      }).then((res) => {
        if (res.result.success) {

          var previewLRs = [];
          console.log(res)
          const orders = res.result.orders;
          for (var i = 0; i < orders.length; i++) {
            let tmp1 = orders[i].Time.split('T');
            let tmp2 = tmp1[1].split('.');
            const time = tmp1[0] + " " + tmp2[0];
            const flag = orders[i].Status;
            var imgPath = "";
            if (flag) imgPath = readyImgPath; //完成
            else imgPath = unreadyImgPath;
            let aOrder = {
              index: i,
              id: orders[i].No,
              status: flag,
              conditionForDisplay: true,
              imagePath: imgPath,
              rightText: time,
            }
            previewLRs.push(aOrder)
          }
          this.setData({
            isChef: isChef,
            userID: userID,
            previewLRs: previewLRs,
          })

        }
      })
    })
  },

  navigateHandler(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order/orderDetails/index?billID=${id}`,
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