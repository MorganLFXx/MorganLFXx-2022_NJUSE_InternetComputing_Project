const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { feedbackContent } = event; // 从前端传入的反馈内容

    // 在数据库中保存反馈信息
    const result = await db.collection('feedback').add({
      data: {
        content: feedbackContent,
        timestamp: new Date(),
      },
    });

    // 返回成功
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    // 返回失败
    return {
      success: false,
      errMsg: error.message,
    };
  }
};
