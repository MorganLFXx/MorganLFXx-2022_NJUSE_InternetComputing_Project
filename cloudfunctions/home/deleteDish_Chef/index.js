const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database;
const currentWindow = db.collection("001001");
exports.main = async (event, context) => {
  try {
    errcode = await currentWindow
      .where({
        ID: event.ID,
      })
      .remove();
  } catch (e) {
    console.error(e);
  }
  return !errcode;
};
