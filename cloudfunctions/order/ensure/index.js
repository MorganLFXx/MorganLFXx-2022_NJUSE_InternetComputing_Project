const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async (event, context) => {
  try {
    const orderNo = event.No;
    const User_id = orderNo.substring(0, 6);
    const orders = db.collection(`orders_${User_id}`);
    const result = await orders
      .where({
        No: orderNo,
      })
      .update({
        data: { Status: true },
      });
    return true;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      e,
    };
  }
};
