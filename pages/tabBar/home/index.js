// pages/tabBar/home/index.js
import {
  ItemType,
  Campus,
  CampusName,
  Canteen,
  CanteenName,
  Window,
  WindowName,
  studentLeftBtnStoragePath,
  studentRightBtnStoragePath,
  chefLeftBtnStoragePath,
  chefRightBtnStoragePath,
} from "../../enumerations"

let curCampus = 0,
  curCanteen = 0,
  curWindow = 0,
  curWindowNo = "000000"
let checkUserInfo
let leftBtnPath, rightBtnPath

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
    previewLMRs: [
      //   {
      //   index: 0, //它在当前数组的下标
      //   imagePath: "../../../resources/navBar/unselectedHome.png",
      //   midText: "测试菜品14￥",
      //   price: 14,
      //   rightText: 0,
      //   id: "0000000001",
      //   hasBtn: true,
      //   conditionForDisplay: true, //会在onLoad判定
      // }, {
      //   index: 1,
      //   imagePath: "../../../resources/navBar/unselectedHome.png",
      //   midText: "试菜品14￥",
      //   price: 14,
      //   rightText: 0,
      //   id: "0000000002",
      //   hasBtn: true,
      //   conditionForDisplay: true,
      // }
    ],
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
    nickname: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.init();

    var identity = false;
    //加载identity
    wx.cloud.callFunction({
      name: "me",
      data: {
        type: "matchAccount",
      }
    }).then((res) => {
      console.log(res)
      const userID = res.result.User_id;
      const nickname = res.result.nickname;
      console.log(userID);
      console.log(nickname)
      if (userID === "999999") {
        wx.redirectTo({
          url: `/pages/me/editInfo/index?isRegister=${true}`,
        })
      } else {
        if (userID.startsWith("888")) {
          identity = true;
          leftBtnPath = chefLeftBtnStoragePath;
          rightBtnPath = chefRightBtnStoragePath;
        } else {
          leftBtnPath = studentLeftBtnStoragePath;
          rightBtnPath = studentRightBtnStoragePath;
        }
        this.setData({
          userID: userID,
          nickname: nickname,
          isChef: identity,
        })
      }
    })

    var pickers = this.data.pickers;
    for (var picker of pickers) {
      picker.conditionForDisplay = true;
      picker.isReady = false;
    }
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
      const index = parseInt(e.currentTarget.dataset.index)
      const id = e.currentTarget.dataset.id;
      console.log(id)
      wx.cloud.callFunction({
        name: "home",
        data: {
          type: "deleteDish_Chef",
          ID: id
        },
      }).then((res) => {
        console.log(res)
        var previewLMRs = this.data.previewLMRs;
        previewLMRs[index].conditionForDisplay = false;
        this.setData({previewLMRs: previewLMRs})
      })
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
      wx.navigateTo({
        url: `/pages/home/editInfo/index?dishID=${e.currentTarget.dataset.id}`,
      })
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
      const windowNo = this.expand(curCanteen + "", 3) + this.expand(window + "", 3);
      curWindow = window;
      curWindowNo = windowNo;
      console.log(windowNo)
      wx.cloud.callFunction({
        name: "home",
        data: {
          type: "showMenuInTheWindow",
          windowNumber: windowNo, //todo: windowNo
        },
      }).then((res) => {
        console.log(res)
        var previewLMRs = this.data.previewLMRs;
        previewLMRs = [];
        if (res.result.success == false) {

        } else {
          var menu = res.result.menu;
          for (var i = 0; i < menu.length; i++) {
            let newPre = {
              index: i,
              midText: menu[i].Name + " ￥" + menu[i].Price,
              rightText: 0,
              name: menu[i].Name,
              price: menu[i].Price,
              id: menu[i].ID,
              hasBtn: true,
              conditionForDisplay: true,
              imagePath: menu[i].Picture_path,
              leftBtn: leftBtnPath,
              rightBtn: rightBtnPath,
            };
            console.log(newPre)
            previewLMRs.push(newPre);
          }
        }
        this.setData({
          previewLMRs: previewLMRs,
        })
      })
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
      url: `../../home/menuDetails/index?dishID=${e.currentTarget.dataset.id}`,
    }) //传递身份
  },

  async toSettleAccounts() {
    //todo: 将当前所选择的菜品，发送至后端，包括菜品的数量和在数组中的索引还有价格
    //厨师视角：进行添加菜品
    if (this.data.isChef) {
      var newID;
      if (this.data.previewLMRs.length > 0) {
        newID = this.data.previewLMRs[this.data.previewLMRs.length - 1].id;
        var tmp = parseInt(newID.substring(newID.length - 4)) + 1;
        newID = curWindowNo + this.expand(tmp + "", 4);
      } else {
        newID = curWindowNo + this.expand("1", 4);
      }
      wx.navigateTo({
        url: `/pages/home/editInfo/index?dishID=${newID}`, //全一广播地址
      })
    } else {
      const previewLMRs = this.data.previewLMRs;
      var sum = 0;
      for (var i = 0; i < previewLMRs.length; i++) {
        sum += previewLMRs[i].rightText * previewLMRs[i].price;
      }
      //向后端发送数据
      console.log(sum)
      let dishes = []
      const timeInfo = new Date();
      for(var i = 0;i<previewLMRs.length;i++){
        if(previewLMRs[i].rightText > 0){
          let aDish = {
            ID: previewLMRs[i].id,
            Price: previewLMRs[i].price,
            Num: previewLMRs[i].rightText,
            Name: previewLMRs[i].name,
          };
          dishes.push(aDish);
        }
      }
      var orderID;
      console.log("s bef")
      wx.cloud.callFunction({
        name: "order",
        data: {
          type: "settleOrder",
          Dishes: dishes,
          Status: false,
          Time: timeInfo,
          Total_price: sum,
          User_id: this.data.userID,
          User_name: this.data.nickname,
          windowNo: curWindowNo,
        }
      }).then((res)=>{
        console.log("s mid")
        console.log(res);
        orderID = res.result.No;
        wx.navigateTo({
          url: `/pages/home/score/index?userID=${this.data.userID}&windowNo=${curWindowNo}&orderID=${orderID}`,
        })
      })
      console.log("s aft")
      
    }
  },

  inputHandler(e) {
    const value = e.detail.value;
    var isFormed = checkUserInfo(value, ItemType.window);
    var isEmpty = value.trim() === '';
    var previewLMRs = this.data.previewLMRs;
    if (isFormed) {
      for (var i = 0; i < previewLMRs.length; i++) {
        if (previewLMRs[i].midText.startsWith(value)) {
          previewLMRs[i].conditionForDisplay = true;
        } else {
          previewLMRs[i].conditionForDisplay = false;
        }
      }
      this.setData({
        previewLMRs: previewLMRs,
        isStandard: isFormed,
        isEmpty: isEmpty,
      })
    }
    if (isEmpty || !isFormed) {
      console.log(1)
      for (var i = 0; i < previewLMRs.length; i++) {
        previewLMRs[i].conditionForDisplay = true;
      }
      this.setData({
        previewLMRs: previewLMRs
      })
    }
  },

  expand(src, len) {
    while (src.length < len) src = "0" + src;
    return src
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