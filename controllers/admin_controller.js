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


/*...................create banner api..........*/
const create_banner_api=async(req,res)=>{
	try{
		
		const banner_image = req.file ? req.file.filename : null;

if(!banner_image){
	res.status(400).json({"result":"false","message":"required parameter banner_image"});

}else{

	const banner_data= new Banner({
		banner_image

	});
	const data=await banner_data.save();
	res.status(200).json({"result":"true","message":"Banner inserted sucessfully",data:data});
  }

	}catch(err){
		res.status(400).json({"result":"false","message":err.message});
		console.log(err.message)
	}

};






/*....................exports variables...........*/
module.exports={
	create_banner_api,
	

};