const express = require('express');
const router = express.Router();
const city = require('../services/addresses');

router.get('/', async function (req, res, next) {
  try {
    res.json(await city.allAddresses(req.query));

  } catch (err) {
    console.error(`Error while getting allAddresses`, err.message);
    next(err);
  }
});

module.exports = router;