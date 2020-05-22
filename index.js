const myexpress = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");

const corsConfig = require("./cors-config");

const app = myexpress();

const connection = require("./db");
const userEvents = require("./routes/events");
const userRoutes = require("./routes/user");
const emailRoutes = require("./routes/email");
const newCalenderRoutes = require("./routes/new-calender");

const PORT = process.env.PORT || 9000;

const uri = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.PASSWORD_DB}@cluster0-5ahtq.mongodb.net`;

let refreshTokens = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`hmm listeneing ${PORT}`);
});
app.use("/events", userEvents);
app.use("/user", userRoutes);
app.use("/email", emailRoutes);
app.use("/new-calender", newCalenderRoutes);

app.options("*", cors(corsConfig));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Events API");
});

app.post("/update-new-calender", (request, response) => {
  console.log(">>>>>>>>>>>>>>>>", request.body);

  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("full_calender");
    var myQuery = { ObjId: request.body.ObjId };
    var myobj = { $set: { isSelected: request.body.isSelected } };
    dbo
      .collection("create_new_calender")
      .update(myQuery, myobj, function (err, res) {
        if (err) response.json({ ok: false });
        console.log("1 document inserted");
        response.json({ ok: true });
        db.close();
      });
  });
});

app.put(
  "/update-calender-event-by-id",
  connection.authenticate,
  (request, response) => {
    console.log(">>>>>post calender>>>>>>>eventId>>>>", request.body.eventId);
    console.log(">>>>>post calender>>>>>>date>>>>>", request.body.date);
    const username = request.username.username;
    console.log("::username:::", username);

    MongoClient.connect(uri, function (err, db) {
      if (err) throw err;
      const query = { eventId: request.body.eventId };
      const update = {
        $set: {
          date: request.body.date,
        },
      };
      const options = { new: true };
      const collection = db
        .db("full_calender")
        .collection(`${username}_events`);

      collection.findOneAndUpdate(query, update, options, function (err, res) {
        if (err) {
          response.json({ ok: false });
          process.exit(0);
        }
        console.log("1siva document updated"); //fix need to be promise
      });

      collection.find().toArray((err, result) => {
        if (err) throw err;
        response.json(result || []);
      });

      db.close();
    });
  }
);

app.get("/priority-events", (request, response) => {
  console.log(">>>>>>>>>>>priority-events>>>>>>>>>");
  MongoClient.connect(uri, (err, db) => {
    const collection = db.db("full_calender").collection("priority_status");
    collection.find().toArray((err, result) => {
      if (err) throw err;
      response.json(result || []);
    });
    db.close();
  });
});

app.post("/create-user", (request, response) => {
  console.log(">>>>>>>>>>>create-user>>>>>>>>>", request.body);

  MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;

    var dbo = db.db("full_calender");
    var userProfile = request.body;

    //fix find users and then create

    let isUserExists = false;
    let isUserCollectionExists = false;

    if (!isUserCollectionExists) {
      dbo.createCollection(`${userProfile.username}_events`, (err, res) => {
        if (err) throw err;
        console.log("events Collection is created! for ", userProfile.username);
        db.close();
      });

      dbo.createCollection(
        `${userProfile.username}_new_calender`,
        (err, res) => {
          if (err) throw err;
          console.log(
            "events Collection is created! for ",
            userProfile.username
          );
          db.close();
        }
      );

      if (!isUserExists) {
        dbo.collection("users").insertOne(userProfile, function (err, res) {
          if (err)
            status(444).send({
              error: true,
              message: "Server eror unable to insertOne",
            });
          console.log("1 document inserted");
          response.status(200).send({ ok: true });
          db.close();
        });
      }

      // db.close();
    }
  });
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = connection.generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", (request, response) => {
  console.log(">>>>>>>>>>>login>>>>>>>>>", request.body);

  // const refreshToken = jwt.sign({username}, REFRESH_TOKEN_SECRET)
  // refreshTokens.push(refreshToken)
  // res.json({ accessToken: accessToken, refreshToken: refreshToken });

  const username = request.body.username;
  console.log(">>login", username);

  MongoClient.connect(uri, (err, db) => {
    const collection = db.db("full_calender").collection("users");
    collection.findOne({ username }, (error, result) => {
      console.log("userfound", result);

      if (result) {
        const accessToken = connection.generateAccessToken({ username });

        response.status(200).send({
          isLogin: true,
          message: "User found",
          accessToken,
          username,
        });
      } else {
        response.status(404).send({ error: true, message: "User not found" });
      }
    });
    db.close();
  });
});

app.get("*", (req, res) => {
  res.status(404).send({ error: true, message: "No route found" });
});
