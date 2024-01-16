// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { userId, orderNo } = event;

    // 查询对应用户ID和订单编号的订单详情数据
    const order = await db.collection(`orders_${userId}`).where({
      No: orderNo,
    }).get();

    if (order.data.length === 0) {
      return {
        success: false,
        message: '未找到对应订单',
      };
    }

    return {
      success: true,
      order: order.data[0],
    };
  } catch (error) {
    console.error('云函数执行失败', error);
    return {
      success: false,
      error,
    };
  }
};
