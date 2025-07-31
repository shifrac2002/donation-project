const express = require('express');
const router = express.Router();
const shul = require('../services/shul');


router.post('/add', shul.upload.single('file'), async function (req, res) {
  try {
    console.log(req.body)
    res.json(await shul.createShul(req.body))
  }
  catch (err) {
    console.error(`Error the shul not create`, err.message);

  }
});

router.get('/:idOfItem/getShuls/searchShul/:nameOfShul', async function (req, res, next) {
  let shulToSearch = {
    "name": req.params.nameOfShul,
    "itemId": req.params.idOfItem
  };
  try {
    res.json(await shul.searchShulOfItem(shulToSearch));
  } catch (err) {
    console.error(`Error while getting Item for search`, err.message);
    next(err);
  }
});

router.get('/:idOfItem/getShuls/searchShul/', async function (req, res, next) {
  let shulToSearch = {
    "name": null,
    "itemId": req.params.idOfItem
  };
  try {
    res.json(await shul.searchShulOfItem(shulToSearch));
  } catch (err) {
    console.error(`Error while getting Item for search`, err.message);
    next(err);
  }
});

router.get('/all/:limit', async function (req, res, next) {
  try {
    debugger
    console.log(req.params.limit)
    res.json(await shul.allShulsByLimit(req.params.limit));
  } catch (err) {
    console.error(`Error while getting all shuls`, err.message);
    next(err);
  }
});

router.get('/all', async function (req, res, next) {
  try {
    debugger
    res.json(await shul.allShuls());
  } catch (err) {
    console.error(`Error while getting all shuls`, err.message);
    next(err);
  }
});

router.get('/:id/getFreeDonation', async function (req, res, next) {
  let shulId = req.params.id;
  try {
    res.json(await shul.allFreeDonation(shulId));
  } catch (err) {
    console.error(`Error while getting all shuls`, err.message);
    next(err);
  }
});

router.get('/:id/itemsDedication', async function (req, res, next) {
  let shulId = req.params.id;
  try {
    res.json(await shul.allItemsDedication(shulId));

  } catch (err) {
    console.error(`Error while getting all shuls`, err.message);
    next(err);
  }
});

router.get('/:id/freeDedication', async function (req, res, next) {
  let shulId = req.params.id;
  try {
    res.json(await shul.allFreeDedication(shulId));

  } catch (err) {
    console.error(`Error while getting all shuls`, err.message);
    next(err);
  }
});

router.post('/items/all', async function (req, res, next) {
  try {
    debugger
    console.log(req.body)
    console.log(req)
    res.json(await shul.allItemOfShul(req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get('/search/:nameOfShul', async function (req, res, next) {
  let shulName = req.params.nameOfShul;
  try {
    res.json(await shul.searchShul(shulName));
  } catch (err) {
    console.error(`Error while getting all shuls whith this name`, err.message);
    next(err);
  }
});

router.get('/search/', async function (req, res, next) {
  let shulName = req.params.nameOfShul;
  console.log(shulName)
  try {
    res.json(await shul.searchShul(shulName));
  } catch (err) {
    console.error(`Error while getting all shuls whith this name`, err.message);
    next(err);
  }
});

module.exports = router;