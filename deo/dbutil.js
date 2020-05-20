var mysql = require('mysql');

function createConnection () {
    var connection = mysql.createConnection({
        host: '192.168.2.101',
        post: '3306',
        user: 'root',
        password: 'asd147...',
        database: 'my_blog'
    });
    return connection;
}

module.exports.connection = createConnection;