var dbutil = require('./dbutil');

function insertComments(bid, parent, parentName, userName, comments, email, ctime, utime, success) {
    var insertSql = 'insert into comments(blog_id, parent, parent_name, user_name, comments,  email, ctime, utime) value(?, ?, ?, ?, ?, ?, ?, ?)';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [bid, parent, parentName, userName, comments, email, ctime, utime];
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

function queryCommentsByBlogId (bid, success) {
    var querySql = 'select * from comments where blog_id = ?';
    var params = [bid];
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

function queryCommentsCountByBlogId(bid, success) {
    // 根据某个属性查总数
    var querySql = 'select count(1) as count from comments where blog_id = ? ';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [bid];
    var connection = dbutil.connection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
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

// 查询最新评论
function queryNewComments(size, success) {
    // 从最后面id查起，查多少个
    var querySql = 'select * from comments order by id desc limit ? ';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [size];
    var connection = dbutil.connection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
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
    'insertComments': insertComments,
    'queryCommentsByBlogId': queryCommentsByBlogId,
    'queryCommentsCountByBlogId':queryCommentsCountByBlogId,
    'queryNewComments': queryNewComments
}