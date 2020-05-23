const MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET =
  "bc798a993a0ce8b97095620421af74d5ea95e69db8f4643112a1e89cd5071aaf12f1fb2f2d5969102a19ff80f93c2465242e303b66dfede56b50ec8899981239";
const REFRESH_TOKEN_SECRET =
  "bc8958a993a0ce8b97095620421af74d5ea95e69db8f4856912a1e89cd5071aaf12f1fb2f2d5969102a19ff80f93c2465242e303b66dfede56b50ec8899981239";

const initialize = async () => {
  
  const url = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.PASSWORD_DB}@cluster0-5ahtq.mongodb.net`;
  
  const dbName = "full_calender";
  
  const client = new MongoClient(url);

  try {
    
    await client.connect();

  } catch (e) {
    
    console.log("err", e);
    
    return Promise.reject(new Error(520));
  
  }

  return Promise.resolve(client.db(dbName));
};

const generateAccessToken = (user) =>
  jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15000s" });

const authenticate = (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  console.log(">>>tocken verify", token);
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, username) => {
    if (err) return res.status(403).send(erorCodeMapper[403]);
    let {username:user}= username
    console.log(">>username", user);
    req.username = user;
    next();
  });
};

const erorCodeMapper = {
  520: { error: true, message: "Failed to connect to server" },
  403: { error: true, message: "The server understood the request, but is refusing to authorise it." },
};

module.exports = {
  initialize,
  generateAccessToken,
  authenticate,
  erorCodeMapper,
};
