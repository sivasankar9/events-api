const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', connection.authenticate, async(request, response)=> {

    try {

        const db = await connection.initialize();

        const col = db.collection('priority_status');

        const docs = await col.find().toArray();

        response.json(docs);

        db.close();

    } catch ({ message: errorCode }) {

        response.status(errorCode).send(connection.erorCodeMapper[errorCode]);

    }

});

module.exports = router;
