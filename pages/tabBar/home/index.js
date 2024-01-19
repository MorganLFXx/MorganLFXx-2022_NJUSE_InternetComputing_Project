// pages/tabBar/home/index.js
import {
  ItemType,
  Campus,
  CampusName,
  Canteen,
  CanteenName,
  Window,
  WindowName,
} from "../../enumerations"

let curCampus, curCanteen, curWindow
let checkUserInfo

require('../../util',
  (module) => {
    checkUserInfo = module.checkUserInfoLegality
  },
  (err) => {
    console.error(err)
  }
)


Page({
  data: {
    //previewLMRs: [],//用于存储从后端数据库中加载而来的菜品信息
    //测试数据: conditionForDisplay放于了onLoad函数中，注意，左右按钮的图标机器绑定的函数会随着用户访问的身份不同而发生变化 --ykg
    previewLMRs: [{
      index: 0, //它在当前数组的下标
      imagePath: "../../../resources/navBar/unselectedHome.png",
      midText: "测试菜品14￥",
      price: 14,
      rightText: 0,
      id: "1111111111",
      hasBtn: true,
      leftBtn: "../../../resources/navBar/unselectedMe.png",
      rightBtn: "../../../resources/navBar/unselectedOrder.png",
      conditionForDisplay: true, //会在onLoad判定
    }, {
      index: 1,
      imagePath: "../../../resources/navBar/unselectedHome.png",
      midText: "试菜品14￥",
      price: 14,
      rightText: 0,
      id: "1111111111",
      hasBtn: true,
      leftBtn: "../../../resources/navBar/unselectedMe.png",
      rightBtn: "../../../resources/navBar/unselectedOrder.png",
      conditionForDisplay: true,
    }],
    pickers: [{
      itemIndex: ItemType.campus, //判断是筛选什么 --ykg，于changeHandler中调用
      hint: "校区筛选",
      selections: Object.getOwnPropertyNames(Campus),
    }, {
      itemIndex: ItemType.canteen,
      hint: "食堂筛选",
      selections: Object.getOwnPropertyNames(Canteen),
    }, {
      itemIndex: ItemType.window,
      hint: "窗口筛选",
      selections: Object.getOwnPropertyNames(Window),
    }],
    isRight: false, //判断三个筛选栏的排列是否正确
    isChef: false, //判断当前用户的身份是否为厨师
    addImg: "", //添加按钮图片的路径
    hint: "当前筛选栏的排列无效",
    hoverBtnImgPath: "/resources/image/unknown.jpg",
    isStandard: false,
    isEmpty: true,
    alarmUnlessFormed: "窗口名应为全中文",
    userID: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //加载identity
    var pickers = this.data.pickers;
    for (var picker of pickers) {
      picker.conditionForDisplay = true;
      picker.isReady = false;
    }
    //todo 调用云函数，获取当前的校区食堂窗口
    curCampus = 0;
    curCanteen = 0;
    curWindow = 0;
    //

    pickers[0].value = curCampus;
    pickers[1].value = curCanteen;
    pickers[2].value = curWindow;

    this.setData({
      pickers: pickers,
    });
  },

  leftBtnHandler(e) {
    if (this.data.isChef) { //厨师身份，进行删除

    } else {
      var dishIndex = parseInt(e.currentTarget.dataset.index);
      console.log(dishIndex);
      var previewLMRs = this.data.previewLMRs;
      previewLMRs[dishIndex].rightText = previewLMRs[dishIndex].rightText + 1;
      this.setData({
        previewLMRs: previewLMRs,
      })
    }
  },

  rightBtnHandler(e) {
    if (this.data.isChef) { //厨师身份，进行修改

    } else {
      var dishIndex = parseInt(e.currentTarget.dataset.index);
      console.log(dishIndex);
      var previewLMRs = this.data.previewLMRs;
      if (previewLMRs[dishIndex].rightText > 0) previewLMRs[dishIndex].rightText = previewLMRs[dishIndex].rightText - 1;
      this.setData({
        previewLMRs: previewLMRs,
      })
    }
  },

  async changeHandler(event) {
    var itemIndex = event.currentTarget.dataset.itemindex;
    itemIndex -= ItemType.campus
    const value = event.detail.value;
    var pickers = this.data.pickers;
    pickers[itemIndex].value = value;
    this.setData({
      pickers: pickers,
    })
    if (itemIndex == 0) curCampus = value;
    else if (itemIndex == 1) curCanteen = value;
    else curWindow = value;
    if ((pickers[0].value == 0 && pickers[1].value > 3) || (pickers[0].value == 1 && pickers[1].value <= 3)) {
      const window = pickers[2].value;
      //调用后端载入
      this.setData({
        isRight: true,
      });
      //调用向后端发送campus canteen window
    } else {
      this.setData({
        isRight: false,
      })
    }
  },

  tapHandler(e) {
    console.log(this.data.isChef)
    //跳转至菜品详情页面
    wx.navigateTo({
      url: `../../home/menuDetails/index?identity=${this.data.isChef}&dishID=${e.currentTarget.dataset.id}`,
    }) //传递身份
  },

  toSettleAccounts() {
    //todo: 将当前所选择的菜品，发送至后端，包括菜品的数量和在数组中的索引还有价格
    //厨师视角：进行添加菜品
    if (this.data.isChef) {
      wx.navigateTo({
        url: `/pages/home/editInfo/index?dishID=1111111111`, //全一广播地址
      })
    } else {
      const previewLMRs = this.data.previewLMRs;
      var sum = 0;
      for (var i = 0; i < previewLMRs.length; i++) {
        sum += previewLMRs[i].rightText * previewLMRs[i].price;
      }
      //向后端发送数据
      console.log(sum)
      wx.navigateTo({
        url: `/pages/home/score/index?userID=${this.data.userID}`,
      })
    }
  },

  inputHandler(e) {
    const value = e.detail.value;
    var isFormed = checkUserInfo(value, ItemType.window);
    var isEmpty = value.trim() === '';
    var previewLMRs = this.data.previewLMRs;
    if (isFormed) {
      for(var i = 0;i<previewLMRs.length;i++){
        if(previewLMRs[i].midText.startsWith(value)){
          previewLMRs[i].conditionForDisplay = true;
        }  else {
          previewLMRs[i].conditionForDisplay = false;
        }
      }
      this.setData({
        previewLMRs: previewLMRs,
        isStandard: isFormed,
        isEmpty: isEmpty,
      })
    } 
    if(isEmpty || !isFormed) {
      console.log(1)
      for(var i = 0;i<previewLMRs.length;i++){
        previewLMRs[i].conditionForDisplay = true;
      }
      this.setData({previewLMRs: previewLMRs})
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