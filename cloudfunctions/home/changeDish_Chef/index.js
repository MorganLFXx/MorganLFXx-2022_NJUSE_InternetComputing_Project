const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db=cloud.database;
const currentWindow=db.colletion("001001");
exports.main=async(event,context)=>{
	currentWindow.add({
		data:{
			Description:event.Description,
			ID:event.ID,
			Name:event.Name,
			Picture_path:event.Picture_path,
			Price:event.Price,
			Scores:event.Scores,
			comments:event.comments
		},
		success:(res)=>{
			console.log(res);
		}
	})
}