import {ItemType, UserType} from "../../enumerations.js";
let handleInput;


require('../../util', 
  (module)=>{
    handleInput = module.handleInput
  },
  (err)=>{
    console.error(err)
  }
)

Page({

    /**
     * 页面的初始数据
     */
    data: {
      entries: [{
        conditionForDisplay: true,
        hint: "昵称",
        isEmpty: true,
        isStandard: true,
        itemIndex: 0,
        alarmIfEmpty: '请输入姓名',
        alarmUnlessStandardized: '姓名应为纯中文',
      }],
      pickers:[{
        conditionForDisplay: true,
        isReady: true,
        itemIndex: ItemType.type,
        hint: "选择身份",
        selections: Object.getOwnPropertyNames(UserType),
        value: 0,
      }],
      isReady: false,
      isSubmitted: false,
      isRegister: false,
    },

    inputHandler(e){
      console.log("editInfo Input handle")
      handleInput(e, this)
      //向后端发送消息    
    },

    submit(){
      this.setData({
        isSubmitted: true,
      })
    },

    changeHandler(e) {
      const value = e.detail.value;
      var pickers = this.data.pickers;
      pickers[0].value = value;
      this.setData({
        pickers: pickers
      });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
        isRegister: false,
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