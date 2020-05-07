const myexpress = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');

const corsConfig = require('./cors-config');
const app = myexpress();
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 9000;

const uri = `mongodb+srv://manusankar410:ajG61LSj4yb7HFIO@cluster0-5ahtq.mongodb.net/test?retryWrites=true&w=majority`;

const ACCESS_TOKEN_SECRET = 'bc798a993a0ce8b97095620421af74d5ea95e69db8f4643112a1e89cd5071aaf12f1fb2f2d5969102a19ff80f93c2465242e303b66dfede56b50ec8899981239';
const REFRESH_TOKEN_SECRET = 'bc8958a993a0ce8b97095620421af74d5ea95e69db8f4856912a1e89cd5071aaf12f1fb2f2d5969102a19ff80f93c2465242e303b66dfede56b50ec8899981239';

let refreshTokens = [];

//--services
function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1500s' })
}

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    console.log(">>>tocken verify", token);
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, username) => {

        if (err)  return res.sendStatus(403);
        console.log(">>username", username);
        req.username = username;
        next();
    });
}

//--services
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT,()=>{console.log(`hmm listeneing ${PORT}`)});

app.options('*', cors(corsConfig));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Events API");
});



app.get("/events", authenticate, (request, response) => {
	console.log(">>>>>>>>>>>test-priority-events>>>request>>>>>>",request.username.username);
    const username = request.username.username
	console.log("::username:::",username)
	MongoClient.connect(uri,(err ,db)=> {
	  const collection = db.db("full_calender").collection(`${username}_events`);
	  collection.find().toArray((err, result)=>{
	  		if(err) throw err;
	  		response.json(result || []);
	  	})
	  db.close();
	});
	
 });

app.post('/events', authenticate, (request,response)=>{
	console.log('>>>>>>>>>>>>>>>>',request.body);
    const username = request.username.username;
	console.log("::username:::",username);
	MongoClient.connect(uri, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("full_calender");
	  var myobj = request.body;
	  dbo.collection(`${username}_events`).insertOne(myobj, function(err, res) {
	    if (err) response.json({ok:false});
	    console.log("1 document inserted");
	    response.json({ok:true})
	    db.close();
	  });
});
})

app.get("/new-calender",authenticate, (request, response) => {
	console.log(">>>>>>>>>>>>>>>> new-calender >>>>>>",request.username.username);
	const username = request.username.username;
	console.log("::username:::",username);

	MongoClient.connect(uri,(err ,db)=> {
	  const collection = db.db("full_calender").collection(`${username}new_calender`);
	  collection.find().toArray((err, result)=>{
	  		if(err) throw err;
	  		response.json(result || []);
	  	})
	  db.close();
	});
	
 });


app.post('/new-calender',authenticate, (request,response)=>{
	console.log('>>>>>post new-calender>>>>>>>>>>>',request.body);
	console.log('>>>>>post new-calender>>>>>username>>>>>>',request.username);
	const username = request.username.username;
	console.log("::username:::",username);
	MongoClient.connect(uri, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("full_calender");
	  var myobj = request.body;
	  dbo.collection(`${username}_new_calender`).insertOne(myobj, function(err, res) {
	    if (err) response.json({ok:false});
	    console.log("1 document inserted");
	    response.json({ok:true})
	    db.close();
	  });
});
})

app.post('/update-new-calender',(request,response)=>{
	console.log('>>>>>>>>>>>>>>>>',request.body);

	MongoClient.connect(uri, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("full_calender");
	  var myQuery = {ObjId: request.body.ObjId};
	  var myobj = { $set: {isSelected:request.body.isSelected } };
	  dbo.collection("create_new_calender").updateOne(myQuery,myobj, function(err, res) {
	    if (err) response.json({ok:false});
	    console.log("1 document inserted");
	    response.json({ok:true})
	    db.close();
	  });
});
})

app.get('/priority-events',(request,response)=>{
	console.log(">>>>>>>>>>>priority-events>>>>>>>>>");
	MongoClient.connect(uri,(err,db)=>{
		const collection = db.db("full_calender").collection("priority_status");
		collection.find().toArray((err,result)=>{
			if(err)throw err;
			response.json(result || []);
		});
		db.close();
	});

});


app.post('/create-user',(request, response)=>{
	console.log(">>>>>>>>>>>create-user>>>>>>>>>",request.body);
	
	MongoClient.connect(uri, {useUnifiedTopology:true}, function(err, db) {

	  if (err) throw err;
	  
	  var dbo = db.db("full_calender");
	  var userProfile = request.body;

	  //fix find users and then create

	  let isUserExists = false;
	  let isUserCollectionExists = false;


	  if(!isUserCollectionExists){
		  
		dbo.createCollection(`${userProfile.username}_events`,(err, res)=>{
		  	if (err) throw err;
	        console.log("events Collection is created! for ",userProfile.username);
	        db.close();
	  	});

	  	dbo.createCollection(`${userProfile.username}_new_calender`,(err, res)=>{
		  	if (err) throw err;
	        console.log("events Collection is created! for ",userProfile.username);
	        db.close();
	  	});


	  	if(!isUserExists){

		  	dbo.collection("users").insertOne(userProfile, function(err, res) {

			    if (err) status(444).send({error:true, message:'Server eror unable to insertOne'});
			    console.log("1 document inserted");
			    response.status(200).send({ok:true})
			    db.close();
		  	});

	 	 }


	  	// db.close();

	  }

	});

});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})


app.post('/login', (request, response)=>{
	console.log(">>>>>>>>>>>login>>>>>>>>>",request.body);



  // const refreshToken = jwt.sign({username}, REFRESH_TOKEN_SECRET)
  // refreshTokens.push(refreshToken)
  // res.json({ accessToken: accessToken, refreshToken: refreshToken });


	const username = request.body.username;
	console.log(">>login", username);

	MongoClient.connect(uri,(err,db)=>{
		const collection = db.db("full_calender").collection("users");
		collection.findOne({ username }, (error, result) => {
			console.log("userfound",result);
            
            if(result){

            	const accessToken = generateAccessToken({username});

                response.status(200).send({"isLogin" : true, message:'User found', accessToken});
            
            }else{
                
                response.status(404).send({error:true, message:'User not found'});
            
            }
		});
		db.close();
	});

});

app.get('*',(req, res)=>{
	res.status(404).send({error:true, message:'No route found'})
});