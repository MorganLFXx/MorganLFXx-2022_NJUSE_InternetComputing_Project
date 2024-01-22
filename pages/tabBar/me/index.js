// pages/tabBar/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    previewLRs:[{
      id:0,
      imagePath: "../../../resources/image/edit.png",//到时候用云存储的路径，节省主包空间
      rightText: "意见反馈",
      page: "editInfo",
      conditionForDisplay: true,
    }, {
      id:1,
      imagePath: "../../../resources/image/edit.png",
      rightText: "版本信息",
      page: "feedBack",
      conditionForDisplay: true,
    }],
    portraitSrc: "../../../resources/image/unknown.jpg",
    editBtn: "/resources/navBar/unselectedHome.png",
    nickname: "",
    identity: "",
    userID: "1",
  },
  gotofeedback:function(){
    wx.navigateTo({
      url: '/pages/me/feedBack/index'
    })
  }
  ,

  navigateHandler(e) {
    var id = parseInt(e.currentTarget.dataset.id);
    switch(id){
      //todo:根据不同的页面索引进行不同的操作
      case 0:
        wx.navigateTo({
          url: `/pages/me/feedBack/index?userID=${this.data.userID}`,
        })
        break;
      case 1:
        wx.showToast({
          title: '当前版本1.1.0',
          icon: 'none',
          mask:true,
          duration: 2000,
        })
      break;
    }
  },

  toEditInfo() {
    //跳转至编辑页面
    wx.navigateTo({
      url: `../../me/editInfo/index?identity=${this.data.identity}&nickname=${this.data.nickname}&isRegister=${false}`,//需要传递一个身份参数
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: "me",
      data: {
        type: "matchAccount",
      }
    }).then((res)=>{
      console.log(res);
      const userID = res.result.User_id;
      var identity = ""
      if(userID.startsWith("888")) identity = "厨师"
      else identity = "学生"
      this.setData({
        userID: userID,
        nickname: res.result.nickname,
        identity: identity,
      })
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