const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async (event, context) => {
  try {
    const windowNo = event.data.ID.substring(0, 6);
    const currentWindow = db.collection(windowNo);
    const dish = event.data.dish;
    await currentWindow.add({
      data: {
        Description: dish.Description,
        ID: dish.ID,
        Name: dish.Name,
        Picture_path: dish.Picture_path,
        Price: dish.Price,
        Scores: new Array(),
        comments: new Array(),
      },
    });
    return {
      success: true,
      msg: "success!",
    };
  } catch (e) {
    return {
      success: false,
      msg: e,
    };
  }
};
