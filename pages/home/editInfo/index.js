// pages/home/editInfo/index.js
import {
  lastImgStoragePath,
  ItemType,
} from "../../enumerations.js";
let handleInput;

require('../../util',
  (module) => {
    handleInput = module.handleInput
  },
  (err) => {
    console.error(err)
  }
)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishID: "",
    lastImg: "", //其url从onLoad函数中载入
    lastPreview: "",
    entries: [{
      conditionForDisplay: true,
      hint: "菜品名称",
      isEmpty: true,
      isStandard: true,
      itemIndex: 0,
      alarmIfEmpty: '请输入菜品名',
      alarmUnlessStandardized: '菜品名称应为纯中文',
      isReady: false,
      value: "",
    }, {
      conditionForDisplay: true,
      hint: "价格",
      isEmpty: true,
      isStandard: true,
      itemIndex: 1,
      alarmIfEmpty: '请输入价格',
      alarmUnlessStandardized: '价格应为纯数字',
      isReady: false,
      value: "",
    }],
    isPreviewReady: false,
    isReady: false,
    isSubmit: false,
    value: "",
    tempFilePath: "",
    cloudPath: "",
    isAdd: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { //获取从tabBar页面传递过来的图片和简介
    //从后端将对应hash值的简介，读取出来
    var id = options.dishID
    console.log(id);
    wx.cloud.callFunction({
      name: "home",
      data: {
        type: "showDishDetail",
        dishID: id
      },
    }).then((res) => {
      console.log(res)
      var src = res.result;
      if (src.success === false || src.dishDetail.length === 0) {
        this.setData({
          lastImg: lastImgStoragePath,
          lastPreview: "无",
        })
      } else {
        var entries = this.data.entries;
        entries[0].hint = src.dishDetail[0].Name;
        entries[0].value = src.dishDetail[0].Name;
        entries[0].isReady = true;
        entries[0].isStandard = true;
        entries[0].isEmpty = false;
        entries[1].hint = src.dishDetail[0].Price;
        entries[1].value = src.dishDetail[0].Price;
        entries[1].isReady = true;
        entries[1].isStandard = true;
        entries[1].isEmpty = false;
        console.log(options.isAdd)
        this.setData({
          lastPreview: src.dishDetail[0].Description,
          lastImg: src.dishDetail[0].Picture_path,
          entries: entries,
          isAdd: JSON.parse(options.isAdd)
        })
      }
    })
    this.setData({
      dishID: id, //获取dishID
    })
  },

  inputHandler(e) {
    handleInput(e, this)
    var entries = this.data.entries;
    const index = e.currentTarget.dataset.itemindex;
    if (entries[index].isStandard && !entries[index].isEmpty) {
      entries[index].isReady = true;
    } else {
      entries[index].isReady = false;
    }
    var flag = this.data.isPreviewReady;

    for (var i = 0; i < entries.length; i++) {
      flag &= entries[i].isReady;
    }
    flag = flag === 0 ? false : true;
    console.log(flag)
    this.setData({
      entries: entries,
      isReady: flag,
    })
  },

  inputHandler2(e) {
    const value = e.detail.value;
    var f = false
    if (value.trim() !== '') {
      f = true;
    }
    var entries = this.data.entries;
    var flag = f;
    console.log(flag)
    for (var i = 0; i < entries.length; i++) {
      console.log(entries[i].isReady);
      flag &= entries[i].isReady;
    }
    this.setData({
      isReady: flag,
      value: e.detail.value,
      isPreviewReady: f,
    })
  },

  changeImg() {
    var page = this
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        // res.tempFilePaths 是一个数组，包含了用户选择的图片的本地文件路径
        console.log(res)
        const tempFilePath = res.tempFiles[0].tempFilePath;
        page.setData({
          tempFilePath: tempFilePath,
        })
      },
      fail: function (res) {
        // 用户取消选择或发生其他错误时的处理
        console.log("选择图片失败：" + res.errMsg);
      }
    })
  },

  async submit() {
    //todo 向后端发送数据
    var cloudPath = this.data.lastImg;
    var lastPreview = this.data.lastPreview;
    console.log(this.data.dishID.substring(0, this.data.dishID.length - 4))
    if (this.data.tempFilePath !== "") {
      cloudPath = 'images/' + this.data.dishID + '.png';
    }
    if(this.data.value !== "") lastPreview = this.data.value;
    let newDish = {
      Description: lastPreview,
      ID: this.data.dishID,
      Name: this.data.entries[0].value,
      Picture_path: cloudPath,
      Price: parseInt(this.data.entries[1].value),
    };
    if (this.data.tempFilePath !== "") {
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: this.data.tempFilePath, // 本地文件路径
        success: res => {
          // 在这里可以保存图片在云端的 fileID，用于后续的操作
          newDish.Picture_path = res.fileID;
          wx.cloud
          .callFunction({
            name: "home",
            data: {
              type: "changeDish_Chef",
              windowNo: this.data.dishID.substring(0, this.data.dishID.length - 4),
              dish: newDish
            },
          })
          .then((res) => {
            console.log(res);
            wx.showToast({
              title: res.result.msg,
              icon: "success",
            })
            this.setData({
              isSubmit: true,
              lastImg: cloudPath,
            });
          });
        },
        fail: console.error
      })
    } else {
      wx.cloud
      .callFunction({
        name: "home",
        data: {
          type: "changeDish_Chef",
          windowNo: this.data.dishID.substring(0, this.data.dishID.length - 4),
          dish: newDish
        },
      })
      .then((res) => {
        console.log(res);
        wx.showToast({
          title: res.result.msg,
          icon: "success",
        })
        this.setData({
          isSubmit: true,
          lastImg: cloudPath,
        });
      });
    }
    if(!this.data.isAdd){
      console.log(this.data.dishID)
      wx.cloud.callFunction({
        name: "home",
        data: {
          type: "deleteDish_Chef",
          ID: this.data.dishID,
        }
      }).then((res)=>{
        console.log(res)
      })
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