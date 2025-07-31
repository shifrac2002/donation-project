const express = require('express');
const router = express.Router();
const gabay = require('../services/gabay');

router.post('/getShul', async function (req, res, next) {
  try {
    res.json(await gabay.whatShul(req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

module.exports = router;