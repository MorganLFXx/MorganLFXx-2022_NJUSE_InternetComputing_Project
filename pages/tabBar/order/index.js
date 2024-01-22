// pages/tabBar/order/index.js
let identity;//获取身份
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //厨师视角看到的是，自己处理过的所有的菜品的信息，以及未完成的
    previewLRs: [{
      index: 0,
      id: "111111",//订单id
      imagePath: "../../../resources/navBar/unselectedHome.png",
      rightText: "测试菜品14￥",
      conditionForDisplay: true,//会在onLoad判定
      status: "",
    }, {
      index: 1,
      id: "111111",//订单id
      imagePath: "../../../resources/navBar/unselectedHome.png",
      rightText: "测试菜品14￥",
      conditionForDisplay: true,
      status: "",//标记状态
    }],
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
    }).then((res)=>{
      userID = res.result.User_id
    })
  },

  tapHandler(e){//单击删除
    var index = parseInt(e.currentTarget.dataset.index);
    var page = this;//在showModal里面不能用this
    console.log(index)
    wx.showModal({
      title: "提示",
      content: "你真的要删除这条订单信息吗？",
      success: async function(res){
        if(res.confirm){
          //向后端发送消息，删除这条记录
          var previewLRs = page.data.previewLRs;
          previewLRs[index].conditionForDisplay = false;
          page.setData({previewLRs: previewLRs});
          wx.showToast({
            title: '成功',
            duration: 5000,
            icon: "success",
          })
        }
      },
      fail: function(err) {
        console.error(err)
      }
    })
  },

  navigateHandler(e){
    //学生视角
    console.log(1)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order/orderDetails/index?billID=${id}`,
    })
    //厨师视角
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