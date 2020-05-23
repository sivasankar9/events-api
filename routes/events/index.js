const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', connection.authenticate, async(request, response)=> {

    const username = request.username;

    try {

        const db = await connection.initialize();

        const col = db.collection(`${username}_events`);

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

        const col = db.collection(`${username}_events`);

        const docs = await col.insertOne(body);

        response.send(docs);

        db.close();

    } catch ({ message: errorCode }) {

        response.status(errorCode).send(connection.erorCodeMapper[errorCode]);

    }

});

router.put('/update-calender-event-by-id', connection.authenticate, async(request, response)=> {

    const {username, body} = request;

    const query = { eventId: body.eventId };

    const update = {
        $set: {
            date: body.date,
        },
    };

    const options = { new: true };

    try {

        const db = await connection.initialize();

        const col = db.collection(`${username}_events`);

        await col.findOneAndUpdate(query, update, options);

        const docs = await col.find().toArray();

        response.send(docs);

        db.close();

    } catch (err) {

        response.json({ ok: false });
        process.exit(0);

    }

});

module.exports = router;
