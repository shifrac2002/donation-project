const express = require('express');
const router = express.Router();
const city = require('../services/city');

router.get('/', async function (req, res, next) {
  try {
    res.json(await city.allCities(req.query));

  } catch (err) {
    console.error(`Error while getting allCities`, err.message);
    next(err);
  }
});

module.exports = router;