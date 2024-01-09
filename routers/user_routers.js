/*...............import dependancies..............*/
const express =require("express");
const router=express();
const multer=require('multer');

// use multer
const storage=multer.diskStorage({
	destination:"uploads",
	filename:(req,file,cb)=>{
		cb(null,file.originalname);
	},

});

  const upload=multer({
	storage:storage,
	fileFilter:function(req,file,callback){
		if(file.mimetype == "image/png" ||
                 file.mimetype == "image/jpg" ||
                 file.mimetype == "image/jpeg"||
                 file.mimetype == "image/csv"
			){
			callback(null,true)
		}else{
			console.log('only  png , jpg & jpeg,csv file supported')
                     callback(null,false)
		}
	},
	limits:{
		 filesize:100000000000 //1000000 bytes=1MB
   }


});
  
 

/*............import user_controllers.........*/
const userControllers=require("../controllers/user_controller");


/*..........set user controllers url...........*/
router.post("/userSignup",upload.single('user_profile'),userControllers.userSignup_api);
router.post("/verifyOtp",userControllers.verifyOtp);
router.post("/userLogin",userControllers.userLogin_api);
router.post("/resendOtp",userControllers.resendOtp);
router.post("/forgotPassword",userControllers.forgotPassword);
router.post("/updateUser_profile",upload.single('user_profile'),userControllers.updateUser_profile);
router.post("/getUser_profile",userControllers.getUser_profile);
router.get("/banner_list",userControllers.banner_list);



/*..............export router..................*/
module.exports=router;