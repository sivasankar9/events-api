const myexpress = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');

const corsConfig = require('./cors-config');

const app = myexpress();

const connection = require('./db');
const userEvents = require('./routes/events');
const userRoutes = require('./routes/user');
const emailRoutes = require('./routes/email');
const loginRoutes = require('./routes/login');
const priorityeventsRoutes = require('./routes/priority-events');
const newCalenderRoutes = require('./routes/new-calender');

const PORT = process.env.PORT || 9000;

const uri = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.PASSWORD_DB}@cluster0-5ahtq.mongodb.net`;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, ()=> {

    console.log(`hmm listeneing ${PORT}`);

});
app.use('/events', userEvents);
app.use('/user', userRoutes);
app.use('/email', emailRoutes);
app.use('/login', loginRoutes);
app.use('/priority-events', priorityeventsRoutes);
app.use('/new-calender', newCalenderRoutes);
app.use((err, req, res, next)=> {

    console.log('ERORRrr::', err);

});
app.options('*', cors(corsConfig));

app.get('/', (req, res)=> {

    res.status(200).send('Welcome to Events API');

});

app.post('/create-user', (request, response)=> {

    console.log('>>>>>>>>>>>create-user>>>>>>>>>', request.body);

    MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {

        if (err) {

            throw err;

        }

        var dbo = db.db('full_calender'),
            userProfile = request.body;

        // fix find users and then create

        let isUserCollectionExists = false,
            isUserExists = false;

        if (!isUserCollectionExists) {

            dbo.createCollection(`${userProfile.username}_events`, (err, res)=> {

                if (err) {

                    throw err;

                }
                console.log('events Collection is created! for ', userProfile.username);
                db.close();

            });

            dbo.createCollection(
                `${userProfile.username}_new_calender`,
                (err, res)=> {

                    if (err) {

                        throw err;

                    }
                    console.log(
                        'events Collection is created! for ',
                        userProfile.username
                    );
                    db.close();

                }
            );

            if (!isUserExists) {

                dbo.collection('users').insertOne(userProfile, function(err, res) {

                    if (err) {

                        status(444).send({
                            error: true,
                            message: 'Server eror unable to insertOne',
                        });

                    }
                    console.log('1 document inserted');
                    response.status(200).send({ ok: true });
                    db.close();

                });

            }

            // db.close();

        }

    });

});

app.post('/token', (req, res)=> {

    const refreshToken = req.body.token;

    if (refreshToken == null) {

        return res.sendStatus(401);

    }
    if (!refreshTokens.includes(refreshToken)) {

        return res.sendStatus(403);

    }
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user)=> {

        if (err) {

            return res.sendStatus(403);

        }
        const accessToken = connection.generateAccessToken({ name: user.name });

        res.json({ accessToken: accessToken });

    });

});

app.delete('/logout', (req, res)=> {

    refreshTokens = refreshTokens.filter((token)=> {

        return token !== req.body.token;

    });
    res.sendStatus(204);

});

app.get('*', (req, res)=> {

    res.status(404).send({ error: true, message: 'No route found' });

});
