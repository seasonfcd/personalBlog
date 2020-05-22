var mysql = require('mysql');

function createConnection () {
    var connection = mysql.createConnection({
        host: '192.168.56.1',//  这里如是是用虚拟机那就改为虚拟Ip地址，window命令行按ipconfig查看
        post: '3306',
        user: 'root',
        password: 'asd147...',
        database: 'my_blog'
    });
    return connection;
}

module.exports.connection = createConnection;