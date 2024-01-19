const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const chefCollection = db.collection("chefs");
// 云函数入口函数
exports.main = async (event, context) => {
  const newChefID = event.data.chefID;
  try {
    const res = await chefCollection
      .where({
        chefID: newChefID,
      })
      .get();
    if (res.data.length > 0) {
      console.log("OK!");
      return {
        isValid: true,
        errMsg: "Your ID is right!",
      };
    } else {
      console.log("false");
      return {
        isValid: false,
        errMsg: "You entered wrong verification code!",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      isValid: false,
      errMsg: "An unexpected incident occurred, please submit feedback.",
    };
  }
};
