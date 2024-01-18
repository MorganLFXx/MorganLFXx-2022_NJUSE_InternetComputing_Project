const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async (event, context) => {
  try {
    const { windowNO, dishID, comment, issuingTime } = event;
    const window = db.colletion(windowNO);
    const result = await window
      .where({
        ID: dishID,
      })
      .update({
        data: {
          comments: _.push({ comment, issuingTime }),
        },
      });
    if (result.errcode === 0) {
      return {
        success: true,
        msg: "上传成功",
      };
    } else {
      return {
        success: false,
        msg: "上传失败",
      };
    }
  } catch (e) {
    return {
      success: false,
      e,
    };
  }
};
