/*.........import models............*/
const User =require("../models/user_models");
const Banner=require("../models/banner_models");

/*............import dependancies................*/
const mongoose=require("mongoose");


/*.................make function and user it........*/
function generate_otp() {
		const OTP=Math.floor(1000 + Math.random()*9000);	
	  return OTP;
}

function generateRandomString() {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const length=8;
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(index);
  }

  return randomString;
 
}



/*........................CREATE API................*/


/*...................create user signup api..........*/
const userSignup_api=async(req,res)=>{
	try{
		const {first_name,last_name,mobile_number,email,password,conform_password,friend_referral_code,fcm_id}=req.body;
		const user_profile = req.file ? req.file.filename : null;

if(!first_name || !last_name || !mobile_number || !email || !password || !conform_password || !fcm_id || user_profile ===null ){
	res.status(400).json({"result":"false","message":"required parameters are first_name,last_name,mobile_number,email,password,conform_password,fcm_id,user_profile and friend_referral_code is optional"});

}else{

const exist_user=await User.findOne({mobile_number});
if(exist_user){
	res.status(400).json({"result":"false","message":"User allready exist in database"});
}else{

if(password !== conform_password){
	res.status(400).json({"result":"false","message":"Your password does not match"});
}else{
	const otp=generate_otp();
	const user_referral_code=generateRandomString();

	const user_data= new User({
		first_name,last_name,mobile_number,email,password,friend_referral_code,user_profile,otp:otp,user_referral_code

	});
	const data=await user_data.save();
	res.status(200).json({"result":"true","message":"User inserted sucessfully",data:data});
  }
 }
}
	}catch(err){
		res.status(400).json({"result":"false","message":err.message});
		console.log(err.message)
	}

};



/*................user_login.................*/
const userLogin_api=async(req,res)=>{
	try{
		const {mobile_number,email,password}=req.body;
		if(!password){
			res.status(400).json({"result":"false","message":"required parameters are password and any one parameter required in both them(mobile_number,email)"})
		}else{
			const Data=await User.findOne({$or:[{mobile_number},{email}]});
			if(!Data){
				res.status(400).json({"result":"false","message":"You are not register"});
			}else{
						const matchData=await User.findOne({$or:[{mobile_number},{email}],password});
						if(matchData){
									res.status(200).json({"result":"true","message":"Use login sucessfully",data:matchData});
						}else{
							res.status(400).json({"result":"false","message":"password does not match"})
						}
					}
				}

	}catch(err){
		res.status(400).json({"result":"false","message":err.message});
	}
  };





/*.....................Resend Otp............*/
  const resendOtp = async (req, res) => {
  try {
    const { mobile_number, choose_status } = req.body;
    const otp=generate_otp();

    if (!mobile_number || !choose_status) {
      return res.status(400).json({ "result": "false", "message": "Required parameters are mobile_number and choose_status (1 for SMS and 2 for email)" });
    }

    const matchData = await User.findOne({ mobile_number });

    if (!matchData) {
      return res.status(400).json({ "result": "false", "message": "Mobile number does not match" });
    }

    let updatedData;

    if (choose_status === 1) {
      // Assuming you have an "otp" variable defined somewhere
      updatedData = await User.findOneAndUpdate({ mobile_number }, { $set: { otp } }, { new: true });
      res.status(200).json({ "result": "true", "message": "OTP sent successfully", data: updatedData });
    } else {
      // Assuming you have an "email" variable defined somewhere
      const matchEmail = matchData.email;

      if (matchEmail) {
        updatedData = await User.findOneAndUpdate({ email: matchEmail }, { $set: { otp } }, { new: true });
        res.status(200).json({ "result": "true", "message": "OTP sent successfully", data: updatedData });
      } else {
        res.status(400).json({ "result": "false", "message": "Email is not correct" });
      }
    }
  } catch (err) {
    res.status(400).json({ "result": "false", "message": err.message });
  }
};

  





/*...................verify otp.............*/
  const verifyOtp=async(req,res)=>{
  	try{
		const {mobile_number,otp}=req.body;
		if(!mobile_number || !otp){
			res.status(400).json({"result":"false","message":"required parameters are mobile_number,otp"});

		}else{
			const findData=await User.findOne({mobile_number});
			if(!findData){
				res.status(400).json({"result":"false","message":"You are not register"});
			}else{
				const Data=await User.findOne({mobile_number,otp});
				if(Data){
					res.status(200).json({"result":"true","message":"Otp verify sucessfully",data:Data});
				}else{
					res.status(400).json({"result":"false","message":"Invalid OTP"});
				}
			}
			
		}

	}catch(err){
		res.status(400).json({"result":"false","message":err.message});
	}

  };




/*................ForgotPassword....................*/
const forgotPassword=async(req,res)=>{
	try{
		const {mobile_number,email,password,conform_password}=req.body;
		if(!password || !conform_password){
			res.status(400).json({"result":"false","message":"required parameters password ,conform_password and any one required parameter in both them(email,mobile_number)"});
		}else{
			const Data = await User.findOne({$or:[{mobile_number},{email}]});
			if(Data){
				if(password !== conform_password){
					res.status(400).json({"result":"false","message":"conform password does not match"})

				}else{
					const updatedData=await User.findOneAndUpdate({$or:[{mobile_number},{email}]},{$set:{password}},{new:true});
					res.status(200).json({"result":"true","message":"password updated successfully",data:updatedData})
				}
			}else{
				res.status(400).json({"result":"false","message":"Please send correct email and mobile_number"})
			}
		}

	}catch(err){
		res.status(400).json({"result":"false","message":err.message});
	}

};




/*...................update userProfile............*/
const updateUser_profile=async(req,res)=>{
	try{
		const {mobile_number,email,first_name,last_name,dob,userId}=req.body;
		const user_profile=req.file ? req.file.filename:null;
		if(! userId){
			res.status(400).json({"result":"false","message":"required parameter is userId and optional parameters are mobile_number,email,first_name,last_name,dob,user_profile"});
		}else{

			if(req.file){
				updateData={
					first_name,
					last_name,
					mobile_number,
					email,
					dob,
                    user_profile:req.file.filename

				}
			}else{
					updateData={
					first_name,
					last_name,
					mobile_number,
					email,
					dob
                   
					}
				}
			const updatedData=await User.findOneAndUpdate({_id:userId},{$set:updateData});
			res.status(200).json({"result":"true","message":"User Profile updated successfully"});	
		}
			
	}catch(err){
		res.status(400).json({"result":"false","message":err.message});
	}

};




/*................getUser_profile................*/
const getUser_profile=async(req,res)=>{
	try{
		const {userId}=req.body;
		if(!userId){
			res.status(400).json({"result":"false","message":"required parameter userId"});
		}else{
			const matchData = await User.findOne({_id:userId});
			if(matchData){
				const data={
					userId:matchData._id,
					email:matchData.email,
					mobile_number:matchData.mobile_number,
					first_name:matchData.first_name,
					last_name:matchData.last_name,
					dob:matchData.dob,
					user_profile:matchData.user_profile,
				};
					res.status(200).json({"result":"true",
					"message":"user profile data are",
					"path":"http://103.104.74.215:3037/uploads/",
					data:[data]})
				
			}else{
				res.status(400).json({"result":"false","message":"User does not found"})
		}

	}

	}catch(err){
		res.status(400).json({"result":"false","message":err.message});
	}

};


/*....................Banner list.............*/
const banner_list=async(req,res)=>{
	try{
			const matchData = await Banner.find({});
			if(matchData){
				res.status(200).json({"result":"true",
				"message":"Banner list are",
			    "path":"http://103.104.74.215:3037/uploads/",	
				 data:matchData
			})
			}else{
				res.status(400).json({"result":"false","message":" data  does not found",})
			}

	}catch(err){
		res.status(400).json({"result":"false","message":err.message});
	}

};



/*....................exports variables...........*/
module.exports={
	userSignup_api,
	userLogin_api,
	resendOtp,
	verifyOtp,
	forgotPassword,
	updateUser_profile,
	getUser_profile,
	banner_list,

};