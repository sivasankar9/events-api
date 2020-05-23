const express = require("express");
const router = express.Router();
const connection = require('./../../db');

router.post("/", connection.authenticate, async(req, res) => {

	const username = req.body.username;

	try{
		const db = await connection.initialize();

		const col = db.collection('users');
		
		const docs = await col.findOne({username});

		db.close();
		
		if(docs){

			res.status(404).send({error:true, message:`${username} is not available`});

		}else{
			
			res.status(200).send({error:false, message:`${username} is available`});
		}

		
	
	}catch({message:errorCode}){
		
		res.status(errorCode).send(connection.erorCodeMapper[errorCode]);
	}

});


module.exports = router;