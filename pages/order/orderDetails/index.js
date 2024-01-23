// pages/order/orderDetails/index.js
import { readyImgPath, unreadyImgPath } from "../../enumerations.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    previewLMRs: [
      //   {
      //   index: 0,//它在当前数组的下标
      //   imagePath: "../../../resources/navBar/unselectedHome.png",
      //   midText: "测试菜品14￥",
      //   price: 14,
      //   rightText: 0,
      //   id: "1111111111",
      //   hasBtn: false,
      //   leftBtn: "../../../resources/navBar/unselectedMe.png",
      //   rightBtn: "../../../resources/navBar/unselectedOrder.png",
      //   conditionForDisplay: true,//会在onLoad判定
      // }, {
      //   index: 1,
      //   imagePath: "../../../resources/navBar/unselectedHome.png",
      //   midText: "测试菜品14￥",
      //   price: 14,
      //   rightText: 0,
      //   id: "1111111111",
      //   hasBtn: false,
      //   leftBtn: "../../../resources/navBar/unselectedMe.png",
      //   rightBtn: "../../../resources/navBar/unselectedOrder.png",
      //   conditionForDisplay: true,
      // }
    ],
    isFinish: false,
    isChef: false,
    id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.billID;
    console.log(id);
    wx.cloud
      .callFunction({
        name: "order",
        data: {
          type: "inquireSpecificOrders",
          orderNo: id,
        },
      })
      .then((res) => {
        if (res.result.success) {
          console.log(res);
          var imgPath;
          const isFinish = res.result.order.Status;
          var isChef;
          const userID = res.result.order.User_id;
          if (userID.startsWith("888")) isChef = true;
          else isChef = false;
          if (isFinish) imgPath = readyImgPath;
          else imgPath = unreadyImgPath;
          const dishes = res.result.order.Dishes;
          var previewLMRs = [];
          for (var i = 0; i < dishes.length; i++) {
            let newPre = {
              index: i,
              midText: dishes[i].Name + " ￥" + dishes[i].Price,
              rightText: dishes[i].Num,
              id: dishes[i].ID,
              hasBtn: false,
              conditionForDisplay: true,
              imagePath: imgPath,
            };
            previewLMRs.push(newPre);
          }
          this.setData({
            isFinish: isFinish,
            isChef: isChef,
            previewLMRs: previewLMRs,
            id: id,
          });
        }
      });
  },

  ensure() {
    wx.cloud
      .callFunction({
        name: "order",
        data: {
          type: "ensure",
          No: this.data.id,
        },
      })
      .then((res) => {
        console.log(res);
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
