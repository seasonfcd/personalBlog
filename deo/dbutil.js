var mysql = require('mysql');

function createConnection () {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        post: '3306',
        user: 'root',
        password: 'asd147...',
        database: 'my_blog'
    });
    return connection;
}

module.exports.connection = createConnection;