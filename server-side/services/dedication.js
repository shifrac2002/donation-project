const db = require('./db');
const config = require('../config');
const {sendEmailToDonor} = require('../nodemailer');

async function freeHandling(data) {
    console.log(data)
    const donation = await db.query(`SELECT * FROM freedonation WHERE Id =${data.id};`)
    const user = await db.query(`SELECT c.Mail, c.FirstName FROM customers c WHERE c.CustomerId = ${donation[0].Customer};`)
    const res = await db.query(` UPDATE freedonation SET Dedication =null WHERE Id =${data.id};`)  
    await sendEmailToDonor(user[0].Mail, user[0].FirstName, donation[0].Dedication);
    return res;
}

async function itemHandling(data) {
    console.log(data + "tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
    const user = await db.query(`SELECT * FROM donations WHERE Id =${data.id};`)
    console.log(user[0].Customer + "ddddddddddddddddddddddddddddddddddd")
    const rows = await db.query(`
      SELECT c.Mail, c.FirstName, d.Dedication
      FROM donations d
      JOIN customers c ON d.Customer = c.CustomerId
      WHERE d.Id = ${data.id};`)
    await db.query(` UPDATE donations SET Dedication =null WHERE Id =${data.id};`)
    console.log(rows)
    await sendEmailToDonor(rows[0].Mail, rows[0].FirstName, rows[0].Dedication);
    console.log("dddddddddddddddddddddddddddddddddddddddddddlllllllllllllllll")

    return rows[0];
}

module.exports = {
    freeHandling, itemHandling
}