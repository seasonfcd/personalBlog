var dbutil = require('./dbutil');

// 插入blog
function insertBlog(title, content, views, tags, ctime, utime, success) {
    var insertSql = 'insert into blog(title, content, views, tags, ctime, utime) value(?, ?, ?, ?, ?, ?)';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [title, content, views, tags, ctime, utime];
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

// 根据page查blog
function queryBlogByPage(page, pageSize , success) {
    // 获取从id倒数开始获取（0是最后一个开始，1是倒数第二个开始），获取几条数据，获取的数据大于数据库里的数据则会将剩余的数据展示出来（直到展现第一条数据为止）
    var querySql = 'select * from blog order by id desc limit ?, ?';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [page * pageSize, pageSize];   // 每隔page * pageSize条数据获取pageSize个数据，page从0开始
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

// 查blog总数
function queryBlogCount( success) {
    var querySql = 'select count(1) as count from blog ';
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


// 根据id查blog
function queryBlogById(id, success) {
    // 获取从id倒数开始获取（0是最后一个开始，1是倒数第二个开始），获取几条数据，获取的数据大于数据库里的数据则会将剩余的数据展示出来（直到展现第一条数据为止）
    var querySql = 'select * from blog where id = ?';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var params = [id];   // 每隔page * pageSize条数据获取pageSize个数据，page从0开始
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

// 根据搜索内容查blog(模糊查询，在tags里查)
function queryBlogBySearchText (searchText, success) {
    var querySql = 'select * from blog where tags like "%' + searchText +  '%"';
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

// 查出根据搜索内容查出的blog总数
function queryBlogCountBySearchText (searchText, success) {
    var querySql = 'select count(1) as count from blog where tags like "%' + searchText +  '%"';
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


// 查询所有blog
function queryAllBlog(success) {
    // 查询所有的blog，根据id末尾开始顺序来返回数据
    var querySql = 'select * from blog order by id desc';
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

// 请求一次就在数据库里增加一次views
function addViews(id, success) {
    var querySql = 'update blog set views = views + 1 where id = ?';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var connection = dbutil.connection();
    var params = [id];
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

// 右边最近热门根据views（浏览数量）请求多少条数据
function queryHotBlog(size, success) {
    var querySql = 'select * from blog order by views desc limit ?';
    // 数据库表连接
    // 每次连接都创建一个新的连接，最后再关闭
    var connection = dbutil.connection();
    var params = [size];
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
    'insertBlog': insertBlog,
    'queryBlogByPage': queryBlogByPage,
    'queryBlogCount': queryBlogCount,
    'queryBlogById': queryBlogById,
    'queryAllBlog': queryAllBlog,
    'addViews': addViews,
    'queryHotBlog': queryHotBlog,
    'queryBlogBySearchText': queryBlogBySearchText,
    'queryBlogCountBySearchText': queryBlogCountBySearchText
}