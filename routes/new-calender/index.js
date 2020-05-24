const express = require('express');
const router = express.Router();
const {authenticate, connect, erorCodeMapper } = require('../../db');

router.get('/', authenticate, async(request, response)=> {

    const username = request.username;

    try {

        const {client, db} = await connect();

        const col = db.collection(`${username}_new_calender`);

        const docs = await col.find().toArray();

        response.send(docs);

        client.close();

    } catch ({ message: errorCode }) {

        response.status(errorCode).send(erorCodeMapper[errorCode]);

    }

});

router.post('/', authenticate, async(request, response)=> {

    const {username, body} = request;

    try {

        const {client, db} = await connect();

        const col = db.collection(`${username}_new_calender`);

        const docs = await col.insertOne(body);

        response.send(docs);

        client.close();

    } catch ({ message: errorCode }) {

        response.status(errorCode).send(erorCodeMapper[errorCode]);

    }

});

module.exports = router;
