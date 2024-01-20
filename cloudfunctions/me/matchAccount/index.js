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
    if (result.data.length !== 0) {
	  console.log(result.data[0].nickname);
	  console.log(result.data[0].User_id);
      return {
        nickname: result.data[0].nickname,
        User_id: result.data[0].User_id,
      };
    } else {
      return {
        nickname: "null",
        User_id: "999999",
      };
    }
  } catch (e) {
    return {
      User_id: "999999",
      msg: "获取用户ID失败",
    };
  }
};
