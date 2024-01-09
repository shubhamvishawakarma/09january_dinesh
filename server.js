/*..............import dependancies..............*/
const http=require('http');
const app=require('./app');//import app file here
const server=http.createServer(app);
const mongoose=require('mongoose');
require('dotenv').config();
const localhost_database=process.env.database_local_url;


/*................local mongodb database connection.......*/
// mongoose.connect(localhost_database,{
// 	useNewUrlParser:true,
//    useUnifiedTopology:true,

// });
// mongoose.connection.on('error',err=>{
// 		console.log('connection fail');
// })

// mongoose.connection.on('connected',connected=>{
// 	console.log('mongodb database connected')
// })



/*.............mongodb database connection on atlas.........*/
const url =process.env.URL;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to databases ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })



/*.................connet to server..............*/
const port =process.env.PORT;
server.listen(port,(error)=>{
	if(error){
		console.log(error)
	}else{
		console.log(`The server is connected sucessfully on port number ${port}`)
	}

});