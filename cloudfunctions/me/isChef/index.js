const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const chefCollection = db.collection("chefs");
// 云函数入口函数
exports.main = async (event, context) => {
	const {newChefID}=event;
  try {
	const res=await chefCollection.where({
		chefID=newChefID
	}).get();
    if (res.data.length > 0) {
      console.log("true")
      return {
		isValid: true,
		errMsg:""
      };
    } else {
	  console.log("false");
	  return{
		  isValid:false,
		  errMsg:""
	  }
    }
  } catch (err) {
	  console.log(err)
	  return {
		  isValid:false,
		  errMsg:"An unexpected incident occurred, please submit feedback."
	  }
  }
};
