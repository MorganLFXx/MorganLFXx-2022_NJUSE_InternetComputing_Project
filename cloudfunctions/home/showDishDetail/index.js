const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { dishName } = event; // 从前端传入的菜品名字

    // 查询数据库中对应菜品的详情
    const result = await db.collection('dishes').where({
      Name: dishName,
    }).get();

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
