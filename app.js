/*...............import dependancies..............*/
const express=require("express");
const app=express();
const bodyParser = require("body-parser");
const cors=require("cors");



/*................built-in express middleware............*/
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {  
       res.set('Access-Control-Allow-Origin', '*');  
       res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');  
       res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');  
       if ('OPTIONS' == req.method) return res.send(200);  
       next();  
       });  


/*................routes express middleware..............*/
const user_routes=require("./routers/user_routers");
const admin_routes=require("./routers/admin_routers");
app.use("/user/api",user_routes);
app.use("/admin/api",admin_routes);



/*................third party express middleware..........*/


/*................error-handler middleware.................*/
app.use((err,req,res,next)=>{
	res.status(404).json({error:err.message});

});


/*.........test api.....*/
app.get("/",async(req,res)=>{
       res.send("Hello developer have a beautiful day")
});


//exports app file from here
module.exports=app;


