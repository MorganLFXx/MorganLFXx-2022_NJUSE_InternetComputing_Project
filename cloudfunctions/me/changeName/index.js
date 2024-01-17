// 云函数入口文件
const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { userId, newNickname } = event;

    // 更新用户昵称
    const result = await db
      .collection("users")
      .doc(userId)
      .update({
        data: {
          nickname: newNickname,
        },
      });

    // 判断是否成功
    if (result.stats.updated === 1) {
      return {
        success: true,
        message: "昵称修改成功",
      };
    } else {
      return {
        success: false,
        message: "昵称修改失败",
      };
    }
  } catch (error) {
    console.error("云函数执行失败", error);
    return {
      success: false,
      error,
    };
  }
};
