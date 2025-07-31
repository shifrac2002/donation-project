const db = require('./db');
const config = require('../config');
const multer = require('multer')

async function createShul(data) {
    let gabay = await db.query(`SELECT * FROM shul.customers where Mail="${data.email}";`);
    console.log(data);
    console.log(gabay, data.name, data.address, gabay[0].CustomerId, data.imageName + " כככככככככככככככככככככככככככככככככככככככככככככככככככככככככככככככ")
    let insertResult = await db.query(`INSERT INTO shuls(NameShul,Address,Customer,Img)
    VALUES("${data.name}","${data.address}",${gabay[0].CustomerId},"http://localhost:6200/${data.imageName}")`);
    
    const newShulId = await db.query(`SELECT * FROM shul.shuls where Customer="${gabay[0].CustomerId}";`);
    await db.query(`UPDATE shul.customers SET ShulId = "${newShulId[0].ShulId}" WHERE CustomerId = "${gabay[0].CustomerId}"`);
    return insertResult;
}

async function allShulsByLimit(limit) {
    debugger
    return await db.query(`SELECT * from shuls limit 10 offset ${limit}`);
}

async function allShuls() {
    debugger
    return await db.query(
        `SELECT * from shul.shuls`
    );
}

async function allItemOfShul(data) {
    console.log(data);
    return await db.query(
        `SELECT itemToDonateId ,Amount,Donated,NameItem, ShulId  FROM itemstodonate JOIN items ON 
        itemstodonate.ItemId = items.ItemId
        WHERE  Donated = 0 and ShulId =${data.ShulId};`);
}

async function allFreeDonation(Id) {
    return await db.query(`SELECT sum(frd.Sum) as Donated
    FROM shul.freedonation frd
    where Shul =${Id}
    group by frd.Shul 
    having sum(frd.Sum)`);
}

async function allItemsDedication(Id) {
    return await db.query(`SELECT donations.Id, it.Name,donations.Dedication,cus.FirstName,cus.LastName FROM shul.donations
    join customers cus on cus.CustomerId=donations.Customer
    join itemstodonate itd on itd.Id=donations.ItemToDonate
    join items it on itd.ItemId=it.Id
    where itd.Shul=${Id} and donations.Dedication is not null`);

}

async function allFreeDedication(Id) {
    return await db.query(`SELECT freedonation.Id, freedonation.Shul,freedonation.Sum, freedonation.Dedication ,cus.FirstName, cus.LastName FROM shul.freedonation
    join customers cus on cus.CustomerId=freedonation.Customer
    where freedonation.Dedication is not null and  freedonation.Shul=${Id}; `);
}

async function searchShul(name) {
    if (name == undefined) {
        return null;
    }
    let result = await db.query(`SELECT ShulId,NameShul,Img from shuls where NameShul like '%${name}%'; `);
    if (result == null) {
        return null;
    }
    return result;
}

async function searchShulOfItem(shulSearch) {
    if (shulSearch.name == null) {
        return null;
    }
    let result = await db.query(
        `SELECT ite.Id,ite.Amount,shuls.NameShul ,ite.Price, ite.Shul ,ite.ItemId,shuls.NameShul, shuls.Img,sum(don.Amount)  as Donated
        FROM shul.itemstodonate ite
        left join donations don on ite.Id=don.ItemToDonate
        JOIN shuls ON ite.Shul=shuls.ShulId 
        where ite.ItemId=${shulSearch.itemId} and NameShul like"%${shulSearch.name}%"
        group by ite.Id 
        having sum(don.Amount) <ite.Amount  or sum(don.Amount) is null`
    );
    if (result == null) {
        return null;
    }
    return result;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

module.exports = {
    createShul, allShuls, searchShulOfItem, allItemOfShul, allFreeDonation, allItemsDedication, allFreeDedication, allShulsByLimit, searchShul, storage, upload
}