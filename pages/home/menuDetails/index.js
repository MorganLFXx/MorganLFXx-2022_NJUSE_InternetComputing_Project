// pages/home/menuDetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishID: "",
    lastImg: "", //其url从onLoad函数中载入
    lastPreview: "",
    name: "",
    score: 0,
    comments: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { //获取从tabBar页面传递过来的图片和简介
    //从后端将对应hash值的简介，读取出来
    var id = options.dishID
    if (id == "1111111111") { //广播地址：新增菜品
      this.setData({
        lastImg: lastImgStoragePath,
      })
    } else {
      wx.cloud.callFunction({
        name: "home",
        data: {
          type: "showDishDetail",
          dishID: id
        },
      }).then((res) => {
        console.log(res)
        var src = res.result;
        var sum = 0;
        var comments = [];
        if (src.dishDetail[0].Scores.length > 0) {
          for (var i = 0; i < src.dishDetail[0].Scores.length; i++) sum += src.dishDetail[0].Scores[i]
          sum /= src.dishDetail[0].Scores.length;
          sum = Math.floor(sum)
        }
        if(src.dishDetail[0].comments.length > 0){
          for(var i = 0;i < src.dishDetail[0].comments.length;i++) {
            let tmp1 = src.dishDetail[0].comments[i].time.split('T');
            let tmp2 = tmp1[1].split('.');
            const time = tmp1[0] + " " + tmp2[0];
            let newComment = {
              content: src.dishDetail[0].comments[i].content,
              time: time,
              trueTime: src.dishDetail[0].comments[i].time
            }
            comments.push(newComment)
          }
          comments.sort(function(a, b){
            return new Date(a.trueTime) - new Date(b.trueTime)
          })
        }
        if(sum === 0) sum = "无"
        this.setData({
          lastPreview: src.dishDetail[0].Description,
          lastImg: src.dishDetail[0].Picture_path,
          name: src.dishDetail[0].Name,
          score: sum,
          comments: comments,        
        })
      })
      this.setData({
        dishID: id, //获取dishID
      })
      //todo 调用云函数
    }
  },


})