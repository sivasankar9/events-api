const express = require('express');
const router = express.Router();
const {connect, erorCodeMapper } = require('../../db');

router.post('/', async(req, res)=> {

    const username = req.body.username;

    try {

        const {client, db} = await connect();

        const col = db.collection('users');

        const docs = await col.findOne({username});

        docs ? res.status(404).send({error: true, message: `${username} is not available`}) :

            res.status(200).send({error: false, message: `${username} is available`});

        client.close();

    } catch ({message: errorCode}) {

        res.status(errorCode).send(erorCodeMapper[errorCode]);

    }

});

module.exports = router;
