const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');

const erorCodeMapper = {
    520: { error: true, message: 'Failed to connect to server' },
    403: { error: true, message: 'The server understood the request, but is refusing to authorise it.' },
};

const ACCESS_TOKEN_SECRET =
  'bc798a993a0ce8b97095620421af74d5ea95e69db8f4643112a1e89cd5071aaf12f1fb2f2d5969102a19ff80f93c2465242e303b66dfede56b50ec8899981239';

const connect = async()=> {

    let db;

    const url = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.PASSWORD_DB}@cluster0-5ahtq.mongodb.net`;

    const dbName = 'full_calender';

    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {

        await client.connect();
        db = client.db(dbName);

    } catch (e) {

        return Promise.reject(new Error(520));

    }

    return Promise.resolve({client, db});

};

const generateAccessToken = (user)=> {

    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15000s' });

};

const authenticate = (req, res, next)=> {

    const authHeader = req.headers.authorization;
    console.log(">>boyd<<>",req.body);
    if(req.body ===""){
        return next(new Error('oos'))
    }
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {

        return res.sendStatus(401);

    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, username)=> {

        if (err) {

            return res.status(403).send(erorCodeMapper[403]);

        }
        let {username: user} = username;

        req.username = user;
        next();

    });

};

module.exports = {
    authenticate,
    connect,
    erorCodeMapper,
    generateAccessToken
};
