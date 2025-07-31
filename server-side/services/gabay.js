const db = require('./db');
const config = require('../config');
async function whatShul(data) {
    let gabay = await db.query(`SELECT * FROM shul.customers where Mail="${data.email}";`);
    console.log(gabay);
    return await db.query(`SELECT * FROM shul.shuls where Customer=${gabay[0].CustomerId}`);
}

module.exports = {
    whatShul
}