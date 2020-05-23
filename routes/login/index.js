const express = require('express');
const router = express.Router();
const connection = require('./../../db');

router.post('/', async(req, res)=> {

    const username = req.body.username;

    try {

        const db = await connection.initialize();

        const col = db.collection('users');

        const docs = await col.findOne({ username });

        if (docs === null) {

            res.status(404).send({ error: true, message: 'User not found' });

        } else {

            const accessToken = connection.generateAccessToken({ username });

            res.status(200).send({
                isLogin: true,
                message: 'User found',
                accessToken,
                username,
            });

        }

        db.close();

    } catch ({ message: errorCode }) {

        res.status(errorCode).send(connection.erorCodeMapper[errorCode]);

    }

});

module.exports = router;
