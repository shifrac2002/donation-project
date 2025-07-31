const db = require('./db');
const config = require('../config');
const {sendThankYouEmail} = require('../nodemailer')

async function addDonation(data) {
    let donate = await db.query(`SELECT * FROM shul.customers where Mail="${data.email}";`);
    const res = await db.query(`INSERT INTO donations(ItemToDonate,Amount,Customer,Dedication) values(${data.id},${data.amount},${donate[0].CustomerId},"${data.dedication}");`);
    sendThankYouEmail(donate[0].Mail, donate[0].FirstName);
    return res;
}

async function saveDonation(data) {
    console.log(data)
    let donateId = await db.query(`SELECT * FROM shul.customers where Mail="${data.Customer}";`);
    console.log(data.Sum, data.Dedication, donateId.CustomerId, data.Shul)
    const res = await db.query(`
    INSERT INTO freedonation(Sum,Dedication,Customer,Shul)
    values(${data.Sum},"${data.Dedication}",${donateId[0].CustomerId},${data.Shul});`);
    sendThankYouEmail(donate[0].Mail, donate[0].FirstName);
    return res;
}

module.exports = {
    addDonation, saveDonation
}
