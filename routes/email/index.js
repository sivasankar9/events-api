const express = require('express');
const router = express.Router();
const connection = require('./../../db');

router.post('/', async(req, res)=> {

    const email = req.body.email;

    try {

        const db = await connection.initialize();

        const col = db.collection('users');

        const docs = await col.findOne({ email });

        if (docs) {

            res.status(404).send({ error: true, message: `${email} exists` });

        } else {

            res.status(200).send({ error: false, message: '' });

        }

        db.close();

    } catch ({ message: errorCode }) {

        res.status(errorCode).send(connection.erorCodeMapper[errorCode]);

    }

});

module.exports = router;
