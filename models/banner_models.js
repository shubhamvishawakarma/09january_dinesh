/*............import dependancies.........*/
const mongoose=require("mongoose");
const bannerSchema=new mongoose.Schema({
	
	banner_image:{
		type:String
	},
	
},{timestamps:true});


/*.............exports userSchema from here............*/
module.exports =bannerModel=mongoose.model("banner",bannerSchema);