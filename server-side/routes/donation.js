const express = require('express');
const router = express.Router();
const donation = require('../services/donation');

router.post('/', async function (req, res, next) {
    try {
        res.json(await donation.addDonation(req.body));   
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.post('/save', async function (req, res, next) {
    try {
        res.json(await donation.saveDonation(req.body));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;