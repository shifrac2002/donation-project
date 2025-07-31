const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function allUsers() {
  return await db.query(
    'SELECT *from customers'
  );
}

async function whatType(data) {
  const result = await db.query(`SELECT * FROM shul.customers where Mail="${data.email}" and BINARY Password="${data.password}";`);
  console.log(result)
  if (result[0] == null) {
    console.log("not exist")
    return "לא קיים";
  }
  if (result.length > 1) {
    return "שתי אפשרויות"
  }
  if (result[0].UserType == 1) {
    console.log("gabay")

    return "גבאי";
  }
  if (result[0].UserType == 2) {
    console.log("donates")
    return "תורם"
  }
}

async function createUser(data) {
  console.log(data)
  const result = await db.query(`SELECT * FROM shul.customers where Mail="${data.email}" and Password="${data.password}";`);
  const userExsist = await db.query(`SELECT * FROM shul.customers where Mail="${data.email}" and Password !="${data.password}";`);
  const emailExsist = await db.query(`SELECT * FROM shul.customers where Mail="${data.email}"`)
  let typeUser;
  if (data.type == "גבאי") {
    typeUser = 1;
  }
  if (data.type == "תורם")
    typeUser = 2;
  const typUser = await db.query(`
  SELECT * FROM shul.customers c 
  where Mail = "${data.email}" and UserType = ${typeUser};`)

  if (emailExsist === null || typUser[0] === undefined) {
    if (typeUser = 1) {
      await db.query(
        ` INSERT INTO customers(FirstName,LastName,Phone,Mail,UserType,Password)
      VALUES("${data.name}","${data.lastName}","${data.phone}","${data.email}",${typeUser},"${data.password}");`
      );
      return ('true');
    }
    else {
      await db.query(
        ` INSERT INTO customers(FirstName,LastName,Phone,Mail,UserType,Password,ShulId)
      VALUES("${data.name}","${data.lastName}","${data.phone}","${data.email}",${typeUser},"${data.password}","${data.idShul}");`
      );
      return ('true');
    }

  }
  else {
    return ('false');
  }
}

async function allFreeDonation(email) {
  const customer = await db.query(`SELECT * FROM shul.customers where Mail ="${email}"`);
  console.log(customer);
  const result = await db.query(`SELECT * FROM shul.freedonation 
  join shuls on shuls.ShulId=freedonation.Shul
  where freedonation.Customer=${customer[0].CustomerId}`);
  if (result == null) {
    return null;
  }
  return result;
}

async function allItemDonation(email) {
  const customer = await db.query(`SELECT * FROM shul.customers where Mail ="${email}"`);
  const result = await db.query(`SELECT donations.Amount, donations.Id, shuls.NameShul, items.Name,ite.Price, Dedication FROM shul.donations  
  join itemstodonate ite on ite.Id=donations.ItemToDonate
  join items on items.Id=ite.ItemId
  join shuls on shuls.ShulId=ite.Shul where donations.Customer=${customer[0].CustomerId}`);
  if (result == null) {
    return null;
  }
  return result;
}

async function associatedShul(email) {
  const result = await db.query(`
  SELECT s.NameShul FROM customers c JOIN shuls s ON c.ShulId = s.ShulId WHERE c.Mail = '${email}' AND c.UserType = 2 `);
  if (result == null) {
    return null;
  }
  return result;
}

async function numberWorshipers(email) {
  const shulResult = await db.query(
    `SELECT ShulId FROM Customers WHERE Mail = '${email}' AND UserType = 1`
  );
  const shulId = shulResult[0].ShulId;
  const countResult = await db.query(
    `SELECT COUNT(*) AS total FROM Customers WHERE ShulId = ${shulId} AND UserType = 2`
  );
  if (countResult == 0) {
    return null;
  }
  return countResult;
}

async function getUserByEmail(email, type) {
  return await db.query(`SELECT * FROM customers c join usertype u WHERE  u.Id = c.UserType and Mail = "${email}" and UserType =${type}`);
}

async function updateUser(data) {
  let updateQuery = `
  UPDATE customers
  SET FirstName = "${data.name}",
      LastName = "${data.lastName}",
      Phone = "${data.phone}",
      Mail = "${data.email}",
      Password = "${data.password}"
`;
  console.log(data.type);
  if (data.type === 2 && data.idShul) {
    updateQuery += `, ShulId = ${data.idShul}`;
  }

  updateQuery += ` WHERE Mail = "${data.oldmail}" AND UserType = ${data.type};`;

  const result = await db.query(updateQuery);
  return result;
}

async function updateUserShul(email, shulId) {
  const updateQuery = `
    UPDATE customers
    SET ShulId = ${shulId}
    WHERE Mail = "${email}" AND UserType = 2;
  `;
  const result = await db.query(updateQuery);
  return result;
}

module.exports = {
  allUsers, whatType, createUser, allFreeDonation, allItemDonation, associatedShul, numberWorshipers, getUserByEmail, updateUser, updateUserShul
}