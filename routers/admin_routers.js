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
const adminControllers=require("../controllers/admin_controller");


/*..........set user controllers url...........*/
router.post("/create_banner_api",upload.single('banner_image'),adminControllers.create_banner_api);



/*..............export router..................*/
module.exports=router;