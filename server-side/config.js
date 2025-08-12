const config = {
    db: {
        // host: "localhost",
        // port: 3306,
        // user: "root",
        // password: "Root123!",
        // database: "shul",
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE,
    },

};
module.exports = config;