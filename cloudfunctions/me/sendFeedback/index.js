const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { feedbackContent } = event; // 从前端传入的反馈内容

    // 在数据库中保存反馈信息
    const result = await db.collection("feedbacks").add({
      data: {
        content: feedbackContent,
        timestamp: new Date(),
      },
    });

    // 返回成功
    return {
      success: true,
      msg:"提交成功！",
    };
  } catch (error) {
    // 返回失败
    return {
      success: false,
      errMsg: error.message,
    };
  }
};
