const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async (event, context) => {
  try {
    const windowNo = event.windowNo;
    const window = db.collection(windowNo);
    //update
    const _ = db.command;
    const result = await window
      .where({
        ID: event.ID,
      })
      .update({
        data: {
          Scores: _.push(event.score),
        },
      });
    console.log(result);
    var status;
    if (result.stats.updated === 1) {
      status = true;
    } else {
      status = false;
    }
    //return new average
    const dish = await window
      .where({
        ID: event.ID,
      })
      .get();
    const array = dish.data[0].Scores;
    const length = array.length;
    var sum = 0;
    for (var i = 0; i < length; i++) {
      sum += array[i];
    }
    const average = sum / length;
    if (average > 0) {
      return {
        averageNum: average,
        success: status,
        msg: "Update successed!",
      };
    } else {
      return {
        averageNum: 0,
        success: status,
        msg: "Update failed!",
      };
    }
  } catch (error) {
    return {
      score: 0, //平均值为0代表出问题了
      error,
    };
  }
};
