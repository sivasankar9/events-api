const express = require('express');
const router = express.Router();
const {connect, erorCodeMapper } = require('../../db');

router.post('/', async(req, res)=> {

    const email = req.body.email;

    try {

        const {client, db} = await connect();

        const col = db.collection('users');

        const docs = await col.findOne({ email });

        docs ? res.status(404).send({ error: true, message: `${email} exists` }) :

            res.status(200).send({ error: false, message: '' });

        client.close();

    } catch ({ message: errorCode }) {

        res.status(errorCode).send(erorCodeMapper[errorCode]);

    }

});

module.exports = router;
