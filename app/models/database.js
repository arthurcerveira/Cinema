const { createPool } = require('mysql');

const pool = createPool({
    user: 'admin',
    password: 'cinema',
    database: 'cinema_dev',
    host: 'localhost',
    port: 3306,
});

module.exports = pool;