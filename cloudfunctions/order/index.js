const inquireOrders = require("./inquireOrders/index");
const inquireSpecificOrders = require("./inquireSpecificOrders/index");
// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "inquireOrders":
      return await inquireOrders.main(event, context);
    case "inquireSpecificOrders":
      return await inquireSpecificOrders.main(event, context);
  }
};
