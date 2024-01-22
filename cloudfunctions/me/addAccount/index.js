const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async (event, context) => {
  try {
    const isChef = event.isChef;
    let { OPENID, APPID, UNIONID } = cloud.getWXContext();
    const collection = await db.collection("users").get();
    const users = collection.data;
    const length = users.length;
    var UserID = parseInt(users[length - 1].User_id);
    UserID++;
    var newUser_id = UserID.toString();
    newUser_id = "000000" + newUser_id;
    const idLength = newUser_id.length;
    newUser_id = newUser_id.substring(idLength - 6, idLength);
    if (isChef) {
      newUser_id = "888" + newUser_id.substring(3, 6);
    }
    db.collection("users").add({
      data: {
        nickname: "User" + newUser_id + "(默认)",
        User_id: newUser_id,
        openID: OPENID,
      },
    });
    return {
      User_id: newUser_id,
    };
  } catch (e) {
    return {
      User_id: "999999",
      msg: "添加用户ID失败",
    };
  }
};
