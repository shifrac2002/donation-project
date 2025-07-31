const express = require('express');
const router = express.Router();
const dedication = require('../services/dedication');


router.put('/freeHandling', async function (req, res, next) {
    try {
        console.log(req.body)
        res.json(await dedication.freeHandling(req.body));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.put('/itemHandling', async function (req, res, next) {
    try {
        console.log(req.body)
        const user = res.json(await dedication.itemHandling(req.body));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;