const myexpress = require('express');
const cors = require('cors')
const app = myexpress();
const MongoClient = require('mongodb').MongoClient;

const PORT = 9000;
const uri = `mongodb+srv://manusankar410:ajG61LSj4yb7HFIO@cluster0-5ahtq.mongodb.net/test?retryWrites=true&w=majority`;

app.use(cors());

app.listen(PORT,()=>{console.log(`hmm listeneing ${PORT}`)});


app.get("/", (req, res) => {
  res.status(200).send("WHATABYTE: Food For Devs");
});

app.get("/incidents/:id",(req, res)=>{

	console.log("id:::",req.params.id);

	let data = [{name:'siva',id:101},{name:'manasa',id:102}];
	 let filter = data.filter(item=>item.id == req.params.id);
	 console.log(">>filter")
	res.send(filter);
})



 app.get("/incidents", (request, response) => {
	console.log(">>>>>>>>>>>>>>>>>>>>>>");
    db.initialize('favorite_songs', 'songs', function (dbCollection) {
        dbCollection.find().toArray(function (err, result) {
            if (err) throw err;
            response.json(result || []);
            console.log(result);
         });
      }, function (err) {
         throw (err);
      });
 });



const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}


 app.get("/events",cors(corsOptions), (request, response) => {
	console.log(">>>>>>>>>>>>>>>>events>>>>>>");

	const client = new MongoClient(uri, { useNewUrlParser: true });
	
	client.connect(err => {
	  const collection = client.db("favorite_songs").collection("songs");
	  collection.find().toArray((err, result)=>{
	  		if(err) throw err;
	  		response.json(result || []);
	  	})
	  client.close();
	});
	
 });