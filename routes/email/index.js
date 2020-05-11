const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.PASSWORD_DB}@cluster0-5ahtq.mongodb.net/test?retryWrites=true&w=majority`;

router.post("/", (req, res) => {

	console.log("req email",req.body.email);
	const email = req.body.email;

	MongoClient.connect(uri,(err ,db)=> {
	  const collection = db.db("full_calender").collection('users');
	  collection.findOne({email},(err, result)=>{
	  	if(err) throw err;
	  	console.log(":email:result",result);
	  	if(result){

	  		res.status(404).send({error:true, message:`${email}, exists`});

	  	}else{
	  		
	  		res.status(200).send({error:false, message:""});

	  	}
	  })
	});
});


module.exports = router;