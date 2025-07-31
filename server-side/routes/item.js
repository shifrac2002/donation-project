const express = require('express');
const router = express.Router();
const item = require('../services/item');
const shul = require('../services/shul');

router.post('/add', shul.upload.single('file'), async function (req, res) {
    try {
        res.json(await item.createItem(req.body))
    }
    catch (err) {
        console.error(`Error the shul not create`, err.message);

    }
})

router.post('/delete', async function (req, res, next) {
    try {
        console.log(req.body);
        res.json(await item.deleteItem(req.body));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.put('/update', async function (req, res, next) {
    try {
        res.json(await item.updateItem(req.body));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.get('/notDonations/:id', async function (req, res, next) {
    let shulId = req.params.id;
    console.log(shulId);
    try {
        res.json(await item.allItemsNotDonated(shulId));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.get('/donatedItems/:id', async function (req, res, next) {
    let shulId = req.params.id;
    try {
        res.json(await item.allItemsDonated(shulId));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.get('/all/:limit', async function (req, res, next) {
    try {
        res.json(await item.allItemsByLimit(req.params.limit));
    } catch (err) {
        console.error(`Error while getting allItems`, err.message);
        next(err);
    }
});

router.get('/:id/getShuls', async function (req, res, next) {
    let itemId = req.params.id;
    try {
        res.json(await item.allShulByItem(itemId));

    } catch (err) {
        console.error(`Error while getting allItems`, err.message);
        next(err);
    }
});

router.get('/notDonations/search/:shulid/:name', async function (req, res, next) {
    let itemToSearch = {
        "name": req.params.name,
        "shulId": req.params.shulid
    };
    try {
        res.json(await item.searchItem(itemToSearch));

    } catch (err) {
        console.error(`Error while getting Item for search`, err.message);
        next(err);
    }
});

router.get('/notDonations/search/:shulid/', async function (req, res, next) {
    let itemToSearch = {
        "name": null,
        "shulId": req.params.shulid
    };
    try {
        res.json(await item.searchItem(itemToSearch));

    } catch (err) {
        console.error(`Error while getting Item for search`, err.message);
        next(err);
    }
});

router.get('/search/:name', async function (req, res, next) {
    let nameItem = req.params.name;
    console.log(nameItem+"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
    try {
        res.json(await item.searchItemFromItem(nameItem));
    } catch (err) {
        console.error(`Error while getting allItems`, err.message);
        next(err);
    }
});

router.get('/search/', async function (req, res, next) {
    let nameItem = req.params.name;
    console.log(nameItem+"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
    try {
        res.json(await item.searchItemFromItem(nameItem));
    } catch (err) {
        console.error(`Error while getting allItems`, err.message);
        next(err);
    }
});

module.exports = router;