const express = require('express');
const router = express.Router();
const user = require('../services/user');


router.get('/', async function (req, res, next) {
  try {
    res.json(await user.allUsers(req.query));

  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

router.get('/:email/freeDonation', async function (req, res, next) {
  let customerEmail = req.params.email;
  try {
    res.json(await user.allFreeDonation(customerEmail));

  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

router.get('/:email/itemDonation', async function (req, res, next) {
  let customerEmail = req.params.email;
  try {
    res.json(await user.allItemDonation(customerEmail));

  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

router.get('/:email/shul', async function (req, res, next) {
  let email = req.params.email;
  try {
    res.json(await user.associatedShul(email));

  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

router.get('/:email/numWorshipers', async function (req, res, next) {
  let email = req.params.email;
  try {
    console.log("ooooooooooooooooooooooooooooooooooo")
    res.json(await user.numberWorshipers(email));
  } catch (err) {
    console.error(`Error while getting shul members count`, err.message);
    next(err);
  }
});


router.post('/logIn', async function (req, res, next) {
  try {
    res.json(await user.whatType(req.body));
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);

  }
});

router.post('/add', async function (req, res, next) {
  try {
    res.json(await user.createUser(req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get('/:email/:type', async function (req, res, next) {
  try {
    const email = req.params.email;
    const type = req.params.type;
    res.json(await user.getUserByEmail(email, type));
  } catch (err) {
    console.error(`Error while fetching user`, err.message);
    next(err);
  }
});
router.put('/update', async function (req, res, next) {
  try {
    res.json(await user.updateUser(req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});
// עידכון בית כנסת לפי מייל
router.put('/update/:email/shul', async function (req, res, next) {
  try {
    const email = req.params.email;
    const shulId = req.body.idShul;
    res.json(await user.updateUserShul(email, shulId));
  } catch (err) {
    console.error(`Error while updating user's shul`, err.message);
    next(err);
  }
});


module.exports = router;