const db = require('./db');
const config = require('../config');

async function createItem(data) {
    let itemId;
    let inItem = await db.query(`SELECT * FROM shul.items where Name="${data.NameItem}";`);
    if (inItem[0] == null) {
        let item = await db.query(`INSERT INTO items(Name,Img) values("${data.NameItem}","http://localhost:6200/${data.imageName}"); `);
        itemId = item.insertId;
    }
    else {
        itemId = inItem[0].Id;
    }
    let amount = parseInt(data.Amount);
    let shulId = parseInt(data.ShulId);
    let price = parseInt(data.PriceForUnit);
    let itemIsExist = await db.query(`SELECT ite.Id,ite.Amount ,ite.Price,items.Name,  ite.Shul, ite.ItemId ,sum(donations.Amount) as Donated
    FROM shul.itemstodonate ite
    left join donations on ite.Id=donations.ItemToDonate
    JOIN items ON ite.ItemId=items.Id and Shul=${shulId}
    where Shul=${shulId} and ItemId=${itemId}
    group by ite.Id 
    having sum(donations.Amount)<ite.Amount or sum(donations.Amount) is null`);
    if (itemIsExist[0] != null) {
        return false;
    }
    await db.query(`INSERT INTO itemstodonate(ItemId,Amount,Shul,Price)
    VALUES(${itemId},${amount},${shulId},${price});`);
    return true;
}

async function deleteItem(data) {
    let itemToDonate = await db.query(`UPDATE itemstodonate
        SET Amount=${data.newAmount}
         WHERE Id =${data.itemId}`);
}

async function allShulByItem(Id) {
    let itemToDonate = await db.query(`SELECT ite.Id,ite.Amount ,shuls.Address,ite.Price, ite.Shul ,ite.ItemId,shuls.NameShul, shuls.Img,sum(don.Amount)  as Donated
    FROM shul.itemstodonate ite
    left join donations don on ite.Id=don.ItemToDonate
    JOIN shuls ON ite.Shul=shuls.ShulId 
    where ite.ItemId=${Id}
    group by ite.Id 
    having sum(don.Amount) <ite.Amount  or sum(don.Amount) is null
    `)
    if (itemToDonate == null) {
        return null;
    }
    else {
        console.log(itemToDonate)
        for (let i = 0; i < itemToDonate.length; i++) {
            if (itemToDonate[i].Donated == null)
                itemToDonate[i].Donated = "0";
        }
        return itemToDonate;
    }
}

async function updateItem(data) {
    console.log(data)
    let inItem = await db.query(`SELECT * FROM shul.items where Name="${data.Name}";`);
    let itemId;
    if (inItem[0] == null) {
        let item = await db.query(`INSERT INTO items(Name) values("${data.Name}"); `);
        itemId = item.insertId;
    }
    else {
        itemId = inItem[0].Id;
    }
    console.log(itemId, data.Amount, data.Shul, data.Price, data.Id)
    let response = await db.query(`UPDATE itemstodonate
    SET ItemId =${itemId},Amount=${data.Amount},Shul=${data.Shul}, Price=${data.Price}
     WHERE Id =${data.Id};`)
    console.log(response);
    return response;
}

async function allItemsNotDonated(shulId) {
    console.log(shulId);
    let itemsNotDonated = await db.query(`
    SELECT ite.Id,ite.Amount ,ite.Price,items.Name, ite.Shul ,sum(don.Amount) as Donated
    FROM shul.itemstodonate ite
    left join donations don on ite.Id=don.ItemToDonate
    JOIN items ON ite.ItemId=items.Id and Shul=${shulId}
    where 0 < ite.Amount
    group by ite.Id 
    having sum(don.Amount)<ite.Amount or sum(don.Amount) is null`);
    console.log(itemsNotDonated, "hhhhhhhhhhhh");
    if (itemsNotDonated[0] == null) {
        return null;
    }
    else {
        console.log(itemsNotDonated)
        for (let i = 0; i < itemsNotDonated.length; i++) {
            if (itemsNotDonated[i].Donated == null)
                itemsNotDonated[i].Donated = "0";
        }
        return itemsNotDonated
    }
}

async function allItemsDonated(shulId) {
    let itemsDonated = await db.query(`
    SELECT ite.Id,ite.Amount ,ite.Price,items.Name, ite.Shul ,sum(don.Amount) as Donated
    FROM shul.itemstodonate ite
    left join donations don on ite.Id=don.ItemToDonate
    JOIN items ON ite.ItemId=items.Id and Shul=${shulId}
    where 0 < ite.Amount
    group by ite.Id 
    having sum(don.Amount)<=ite.Amount or sum(don.Amount) is null`);
    if (itemsDonated[0] == null) {
        return null;
    }
    else {
        for (let i = 0; i < itemsDonated.length; i++) {
            if (itemsDonated[i].Donated == null)
                itemsDonated[i].Donated = "0";
        }
        return itemsDonated
    }
}

async function allItemsByLimit(limit) {
    return await db.query(
        `SELECT * from items limit 10 offset ${limit}`
    );
}

async function searchItem(ItemSearch) {
    if(ItemSearch.name == null)
    {
        return null;
    }
    let result = await db.query(
        `SELECT ite.Id,ite.Amount ,ite.Price,items.Name, ite.Shul ,sum(don.Amount) as Donated
        FROM shul.itemstodonate ite
        left join donations don on ite.Id=don.ItemToDonate
        JOIN items ON ite.ItemId=items.Id and Shul=${ItemSearch.shulId} and Name like "%${ItemSearch.name}%"
        group by ite.Id 
        having sum(don.Amount)<ite.Amount or sum(don.Amount) is null`
    );
    if (result == null) {
        return null;
    }
    return result;
}

async function searchItemFromItem(nameItem) {
    if(nameItem == undefined)
    {
        return null;
    }
    let result = await db.query(
        `SELECT * FROM shul.items
        where Name like '%${nameItem}%'`
    );
    if (result == null) {
        return null;
    }
    return result;
}

module.exports = {
    createItem, deleteItem, updateItem, allItemsNotDonated, allItemsDonated, allItemsByLimit, allShulByItem, searchItem, searchItemFromItem
}