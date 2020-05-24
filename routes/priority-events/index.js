const express = require('express');
const router = express.Router();
const {authenticate, connect, erorCodeMapper } = require('../../db');

router.get('/', authenticate, async(request, response)=> {

    try {

        const {client, db} = await connect();

        const col = db.collection('priority_status');

        const docs = await col.find().toArray();

        response.json(docs);

        client.close();

    } catch ({ message: errorCode }) {

        response.status(errorCode).send(erorCodeMapper[errorCode]);

    }

});

module.exports = router;
