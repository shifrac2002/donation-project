const db = require('./db');
const config = require('../config');

async function allAddresses() {
  return await db.query(
    'SELECT * FROM shul.streets;'
  );
}

module.exports = {
  allAddresses
}