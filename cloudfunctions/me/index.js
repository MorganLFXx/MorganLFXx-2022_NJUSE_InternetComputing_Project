const changeName = require("./changeName/index");
const sendFeedback = require("./sendFeedback/index");
const isChef = require("./isChef/index");
// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "changeName":
      return await changeName.main(event, context);
    case "sendFeedback":
      return await sendFeedback.main(event, context);
    case "isChef":
      return await isChef.main(event, context);
  }
};
