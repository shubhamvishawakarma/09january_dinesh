/*............import dependancies.........*/
const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
	first_name:{
		type:String,
	},
	last_name:{
		type:String
	},
	mobile_number:{
		type:String
	},
	email:{
		type:String
	},
	password:{
		type:String
	},
	fcm_id:{
		type:String
	},
	user_profile:{
		type:String
	},
	user_referral_code:{
		type:String
	},
	friend_referral_conde:{
		type:String
	},
	user_status:{
		type:Number,
	    default:0,
	},
	otp:{
		type:Number
	},
	
	dob:{
		type:String
	},
	socical_media_id:{
		type:String
	}

},{timestamps:true});


/*.............exports userSchema from here............*/
module.exports =userModel=mongoose.model("user_data",userSchema);