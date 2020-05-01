const myexpress = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');

const corsConfig = require('./cors-config');
const app = myexpress();

const PORT = process.env.PORT || 9000;

const uri = `mongodb+srv://manusankar410:ajG61LSj4yb7HFIO@cluster0-5ahtq.mongodb.net/test?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT,()=>{console.log(`hmm listeneing ${PORT}`)});


app.get("/", (req, res) => {
  res.status(200).send("Welcome to Events API");
});



 app.get("/events",cors(corsConfig), (request, response) => {
	console.log(">>>>>>>>>>>>>>>>events>>>>>>");

	MongoClient.connect(uri,(err ,db)=> {
	  const collection = db.db("full_calender").collection("calender_events");
	  collection.find().toArray((err, result)=>{
	  		if(err) throw err;
	  		response.json(result || []);
	  	})
	  db.close();
	});
	
 });

app.post('/events',cors(corsConfig),(request,response)=>{
	console.log('>>>>>>>>>>>>>>>>',request.body);

	MongoClient.connect(uri, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("full_calender");
	  var myobj = request.body;
	  dbo.collection("calender_events").insertOne(myobj, function(err, res) {
	    if (err) response.json({ok:false});
	    console.log("1 document inserted");
	    response.json({ok:true})
	    db.close();
	  });
});
})

app.get("/new-calender",cors(corsConfig), (request, response) => {
	console.log(">>>>>>>>>>>>>>>> new-calender >>>>>>");

	MongoClient.connect(uri,(err ,db)=> {
	  const collection = db.db("full_calender").collection("create_new_calender");
	  collection.find().toArray((err, result)=>{
	  		if(err) throw err;
	  		response.json(result || []);
	  	})
	  db.close();
	});
	
 });


app.post('/new-calender',cors(corsConfig),(request,response)=>{
	console.log('>>>>>>>>>>>>>>>>',request.body);

	MongoClient.connect(uri, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("full_calender");
	  var myobj = request.body;
	  dbo.collection("create_new_calender").insertOne(myobj, function(err, res) {
	    if (err) response.json({ok:false});
	    console.log("1 document inserted");
	    response.json({ok:true})
	    db.close();
	  });
});
})

app.post('/update-new-calender',cors(corsConfig),(request,response)=>{
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

app.get('/priority-events',cors(corsConfig),(request,response)=>{
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


