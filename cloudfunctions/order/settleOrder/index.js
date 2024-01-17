// 云函数入口文件
const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { Total_price, User_id, User_name, Dishs, No, Status, Time } = event;

    // 将订单信息存入以用户ID为名称的集合中
    const result = await db.collection(`orders_${User_id}`).add({
      data: {
        Total_price,
        User_id,
        User_name,
        Dishs,
        No,
        Status,
        Time,
      },
    });

    return {
      success: true,
      orderId: result._id, //
    };
  } catch (error) {
    console.error("结算订单云函数执行失败", error);
    return {
      success: false,
      error,
    };
  }
};
