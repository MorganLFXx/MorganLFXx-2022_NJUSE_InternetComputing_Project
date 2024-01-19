const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database;
exports.main = async (event, context) => {
  try {
    const { orderNo } = event.data;
    const User_id = orderNo.substring(0, 6);
    const user = db.collection(`orders_${User_id}`);
    const result = await user
      .where({
        No: orderNo,
      })
      .remove();
    if (result === 0)
      return {
        success: true,
        msg: "删除成功",
      };
    else {
      return {
        success: false,
        msg: "删除失败",
      };
    }
  } catch (e) {
    console.error("执行失败", e);
    return {
      success: false,
      e,
    };
  }
};
