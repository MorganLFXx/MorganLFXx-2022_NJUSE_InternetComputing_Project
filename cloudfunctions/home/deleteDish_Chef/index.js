const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async (event, context) => {
  try {
    const windowNo = event.ID.substring(0, 6);
    const currentWindow = db.collection(windowNo);
    errcode = await currentWindow
      .where({
        ID: event.data.ID,
      })
      .remove();
    return {
      success: errcode.stats,
      msg: errcode.errMsg,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      e,
    };
  }
};
