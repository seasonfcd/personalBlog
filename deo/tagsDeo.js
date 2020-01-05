var dbutil = require('./dbutil');

function insertTag(tag, ctime, utime, success) {
    var insertSql = 'insert into tags(tag, ctime, utime) value(?, ?, ?)';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [tag, ctime, utime];
    var connection = dbutil.connection();
    connection.connect();
    connection.query(insertSql, params ,function (error, result) {
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

// 查询tag
function queryTag(tag, success) {
    var querySql = 'select * from tags where tag = ?;';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [tag];
    var connection = dbutil.connection();
    connection.connect();
    connection.query(querySql, params ,function (error, result) {
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

function queryRandomTags(success) {
    var querySql = 'select * from tags;';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var connection = dbutil.connection();
    connection.connect();
    connection.query(querySql,function (error, result) {
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
    'insertTag': insertTag,
    'queryTag': queryTag,
    'queryRandomTags': queryRandomTags
}