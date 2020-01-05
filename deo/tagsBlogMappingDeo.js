var dbutil = require('./dbutil');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    var insertSql = 'insert into tag_blog_mapping(tag_id, blog_id, ctime, utime) value(?, ?, ?, ?)';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [tagId, blogId, ctime, utime]; // 注意这里的形参
    var connection = dbutil.connection();
    connection.connect();
    connection.query(insertSql, params ,function (error, result) {
        if (result) {
            //console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    // 关闭连接，每开始一个连接最后都要关闭这个连接
    connection.end();
}

function queryBlogIdInMapping(tagId, page, pageSize, success) {
    // 查出tag_id为几的所有数据（从几到几），相同tag_id的数据可能有多条（分页查）
    var querySql = 'select * from tag_blog_mapping where tag_id = ? limit ?, ?'; // limit后面是从多少个到多少个
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [tagId, page*pageSize, pageSize]; // 注意这里的形参
    var connection = dbutil.connection();
    connection.connect();
    connection.query(querySql, params ,function (error, result) {
        if (result) {
            //console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    // 关闭连接，每开始一个连接最后都要关闭这个连接
    connection.end();
}

function queryBlogCountInMapping(tagId, success) {
    // 查出tag_id为几的有多少条，查总数
    var querySql = 'select count(1) as count from tag_blog_mapping where tag_id = ?'; 
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [tagId]; // 注意这里的形参
    var connection = dbutil.connection();
    connection.connect();
    connection.query(querySql, params ,function (error, result) {
        if (result) {
            //console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    // 关闭连接，每开始一个连接最后都要关闭这个连接
    connection.end();
}

module.exports = {
    'insertTagBlogMapping': insertTagBlogMapping,
    'queryBlogIdInMapping': queryBlogIdInMapping,
    'queryBlogCountInMapping': queryBlogCountInMapping
}