const showMenuInTheWindow = require("./showMenuInTheWindow/index");
const showDishDetail = require("./showDishDetail/index");
const changeDish = require("./changeDish_Chef/index");
const deleteDish = require("./deleteDish_Chef/index");

// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "showMenuInTheWindow":
      return await showMenuInTheWindow.main(event, context);
    case "showDishDetail":
      return await showDishDetail.main(event, context);
    case "changeDish_Chef":
      return await changeDish_Chef.main(event, context);
    case "deleteDish_Chef":
      return await deleteDish_Chef.main(event, context);

  }
};
