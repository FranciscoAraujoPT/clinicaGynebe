var mysql = require('mysq2');


const pool = mysql.createPool({
    host: 'FranciscoAraujo',
    user: 'quico',
    password: 'quico',
    database: 'gynebe',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        throw err;
    }
    console.log('Database connected successfully');
    connection.release();
});

module.exports = pool;