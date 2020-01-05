var dbutil = require('./dbutil');

function insertEveryDay (content, ctime, success) {
    var insertSql = 'insert into every_day(content, ctime) value(?, ?)';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [content, ctime];
    var connection = dbutil.connection();
    connection.connect();
    connection.query(insertSql, params ,function (error, result) {
        if (result) {
            console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    // 关闭连接，每开始一个连接最后都要关闭这个连接
    connection.end();
}

function queryEveryDay (success) {
    // 从id最后一个查起,只取一个
    var querySql = 'select * from every_day order by id desc limit 1';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var connection = dbutil.connection();
    connection.connect();
    connection.query(querySql, function (error, result) {
        if (result) {
            // console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    // 关闭连接，每开始一个连接最后都要关闭这个连接
    connection.end();
}

module.exports = {
    'insertEveryDay': insertEveryDay,
    'queryEveryDay': queryEveryDay
}