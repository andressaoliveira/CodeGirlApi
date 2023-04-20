const mysql = require('mysql');

var pool = mysql.createPool({
    "connectionLimit" : 1000,
    "user" : process.env.MYSQL_USER || 'b02070bd66a21b',
    "password": process.env.MYSQL_PASSWORD || '9b290c34',
    "database" : process.env.MYSQL_DATABASE || 'heroku_fd39529fb995089',
    "host": process.env.MYSQL_HOST || 'us-cdbr-east-06.cleardb.net',
    "port" : process.env.MYSQL_PORT
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}

exports.pool = pool;