const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database;
const currentWindow = db.collection("001001");
exports.main = async (event, context) => {
  const { dishID } = event;
  try {
    errcode = await currentWindow
      .where({
        ID: dishID,
      })
      .remove();
  } catch (e) {
    console.error(e);
    return {
      success: false,
      e,
    };
  }
  return {
	  success:!errcode
  }
};
