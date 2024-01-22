// 云函数入口文件
const cloud = require("wx-server-sdk");
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
    const collection = await db.collection(`orders_${User_id}`).get(); //获取对应用户的订单集合
    const orders = collection.data; //获取集合中的数据（即几条记录组成的数组）
    const length = orders.length; //有几条记录
    //根据记录数量生成新的后三位顺序号
    var randomNo = parseInt(length);
<<<<<<< Updated upstream
    randomNo++;
    var randomNoStr = randomNo.toString();
    randomNoStr = "0000" + randomNoStr;
    const idLength = randomNoStr.length;
    randomNoStr = randomNoStr.substring(idLength - 3, idLength);
=======
    randowNo++;
    var randomNoStr = randomNo.toString();
    randomNoStr = "0000" + randomNoStr;
    const idLength = randomNoStr.length;
    randowNoStr = randomNoStr.substring(idLength - 3, idLength);
>>>>>>> Stashed changes
    //生成No
    var No = User_id + windowNo + randomNoStr;
    // 将订单信息存入以用户ID为名称的集合中
    const result = await db.collection(`orders_${User_id}`).add({
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