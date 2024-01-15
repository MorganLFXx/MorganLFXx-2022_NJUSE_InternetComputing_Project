const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { windowNumber } = event; // 从前端传入的窗口序号

    // 查询数据库中对应窗口的菜单
    const result = await db.collection('menu').where({
      windowNumber: windowNumber,
    }).get();

    // 返回成功和查询到的菜单集合
    return {
      success: true,
      menu: result.data,
    };
  } catch (error) {
    // 返回失败
    return {
      success: false,
      errMsg: error.message,
    };
  }
};
