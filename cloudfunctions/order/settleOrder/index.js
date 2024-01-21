// 云函数入口文件
const cloud = require("wx-server-sdk");
const { renderEnv } = require("XrFrame/kanata/lib/index");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {
      Total_price,
      User_id,
      User_name,
      windowNo,
      Dishes,
      Status,
      Time,
    } = event;
    var No = User_id + windowNo;
    const collection = db.collection(`orders_${User_id}`);
    const orders = collection.data;
    const length = orders.length;
    var randomNo = parseInt(length);
    randowNo++;
    var randomNoStr = randomNo.toString();
    randomNoStr = "0000" + randomNoStr;
    const idLength = randomNoStr.length;
    randowNoStr = randomNoStr.substring(idLength - 3, idLength);
    No += randomNoStr;
    // 将订单信息存入以用户ID为名称的集合中
    const result = await collection.add({
      data: {
        Total_price,
        User_id,
        User_name,
        Dishes,
        No,
        Status,
        Time,
      },
    });
    return {
      No,
    };
  } catch (error) {
    console.error("结算订单云函数执行失败", error);
    return {
      success: false,
      error,
    };
  }
};
