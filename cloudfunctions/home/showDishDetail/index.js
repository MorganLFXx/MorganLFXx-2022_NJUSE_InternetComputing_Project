const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { dishID } = event; // 从前端传入的菜品名字
    const windowsNumber = dishID.substring(0, 6);
    // 查询数据库中对应菜品的详情
    const result = await db
      .collection(windowsNumber)
      .where({
        ID: dishID,
      })
      .get();

    // 返回成功和查询到的菜品详情
    return {
      success: true,
      dishDetail: result.data,
    };
  } catch (error) {
    // 返回失败
    return {
      success: false,
      errMsg: error.message,
    };
  }
};
