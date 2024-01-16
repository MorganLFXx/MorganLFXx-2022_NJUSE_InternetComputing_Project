const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database;
const currentWindow = db.colletion("001001");
exports.main = async (event, context) => {
  try {
    const {
      description,
      id,
      name,
      picture_path,
      price,
      scores,
      comment,
    } = event;
    const result = currentWindow.add({
      data: {
        Description: description,
        ID: id,
        Name: name,
        Picture_path: picture_path,
        Price: price,
        Scores: scores,
        comments: comment,
      },
      success: (res) => {
        console.log(res);
      },
    });
    if (result.stats.updated === 1) {
      return {
        success: true,
        msg: "添加成功",
      };
    } else {
      return {
        success: false,
        msg: "添加失败",
      };
    }
  } catch (e) {
    success: false, e;
  }
};
