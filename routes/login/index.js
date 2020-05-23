const express = require('express');
const router = express.Router();
const {connect, erorCodeMapper, generateAccessToken } = require('../../db');

router.post('/', async(req, res)=> {

    const username = req.body.username;

    try {

        const {client, db} = await connect();

        const col = db.collection('users');

        const docs = await col.findOne({ username });

        if (docs === null) {

            res.status(404).send({ error: true, message: 'User not found' });

        } else {

            const accessToken = generateAccessToken({ username });

            res.status(200).send({
                isLogin: true,
                message: 'User found',
                accessToken,
                username,
            });

        }

        client.close();

    } catch ({ message: errorCode }) {

        res.status(errorCode).send(erorCodeMapper[errorCode]);

    }

});

module.exports = router;
