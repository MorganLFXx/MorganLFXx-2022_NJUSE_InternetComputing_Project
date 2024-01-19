// pages/home/menuDetails/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      isChef: false,
      dishID: "11111111111",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      console.log(options.identity)
      console.log(options.dishID)
      this.setData({
        isChef: options.identity,
        dishID: options.dishID,
      })
    },

    deleteHandler() {
      //向后端发送要删除的菜单编号
      console.log(3)
    },

    editHandler(){
      wx.navigateTo({
        url: `/pages/home/editInfo/index?dishID=${this.data.dishID}`,//传输一个dishID去编辑页面
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