const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', connection.authenticate, async(request, response)=> {

    const username = request.username;

    try {

        const db = await connection.initialize();

        const col = db.collection(`${username}_new_calender`);

        const docs = await col.find().toArray();

        response.send(docs);

        db.close();

    } catch ({ message: errorCode }) {

        response.status(errorCode).send(connection.erorCodeMapper[errorCode]);

    }

});

router.post('/', connection.authenticate, async(request, response)=> {

    const {username, body} = request;

    try {

        const db = await connection.initialize();

        const col = db.collection(`${username}_new_calender`);

        const docs = await col.insertOne(body);

        response.send(docs);

        db.close();

    } catch ({ message: errorCode }) {

        response.status(errorCode).send(connection.erorCodeMapper[errorCode]);

    }

});

module.exports = router;
