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
      // wx.cloud.callFunction({
      //   name: "home",
      //   type: "deleteDish",
      // })
    },

    editHandler(){
      wx.navigateTo({
        url: `/pages/home/editInfo/index?dishID=${this.data.dishID}`,//传输一个dishID去编辑页面
      })
    },
})