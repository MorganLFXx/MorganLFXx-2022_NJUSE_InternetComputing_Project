const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database;
exports.main = async (event, context) => {
  try {
    const { score, windowNO, dishID } = event;
    const window = db.collection(windowNO);
    //update
    const result = await window.doc(dishID).update({
      data: {
        Scores: _.push(score),
      },
    });
    //return new average
    const data = await window.doc(dishID).get();
    const array = data.Scores;
    const length = array.length;
    var sum = 0;
    for (var i = 0; i < length; i++) {
      sum += array[i];
    }
    return sum / length;
  } catch (error) {
    return {
      score: 0, //平均值为0代表出问题了
      error,
    };
  }
};
