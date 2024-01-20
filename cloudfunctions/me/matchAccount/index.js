const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async (event, context) => {
  try {
    let { OPENID, APPID, UNIONID } = cloud.getWXContext();
    const result = await db
      .collection("users")
      .where({
        openID: OPENID,
      })
      .get();
    return {
      nickname: result.data[0].nickname,
      User_id: result.data[0].User_id,
    };
  } catch (e) {
    return {
      User_id: "999999",
      msg: "获取用户ID失败",
    };
  }
};
