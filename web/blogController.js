var blogDeo = require('../deo/blogDeo');
var tagsDeo = require('../deo/tagsDeo');
var tagsBlogMappingDeo = require('../deo/tagsBlogMappingDeo');
var respUtil = require('../util/respUtil'); // 写进返回里的字符串
var timeUtil = require('../util/timeUtil'); // 当前时间秒数
var url = require('url');
var path = new Map();

// 添加blog
function editBlog (request, response) {
    // 提取url里的字符串
    var params = url.parse(request.url, true).query;
    console.log(params);
    // 处理url里的tags（对空格的处理，对英文逗号和中文逗号的处理）
    // 有逗号会被拆分成数个字符串，包含空格不含逗号则会是一个字符串，以逗号作为tag的个数
    var tags = params.tags.replace(/ /g, '').replace('，', ','); //区分英文逗号和中文逗号
    request.on('data', function (data) {
        blogDeo.insertBlog(params.title, data.toString().trim(), 0, tags, timeUtil.getDateNow(), timeUtil.getDateNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
            console.log(result);
            // 初始化blogId，作为后续的传参
            var blogId = result.insertId;
            var tagList = tags.split(',');
            console.log(tagList);
            // 遍历tagList，看数据库表blog里的tag在表tags里是否有数据，一般第一次都是没有
            for (var i = 0; i < tagList.length; i ++) {
                if (tagList[i] == '') {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    });
}
path.set('/editBlog', editBlog);

// 查询blog
function queryBlogByPage (request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params);
    blogDeo.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
            // console.log(result.content);
            // 处理返回的result的content
            for (var i = 0; i < result.length; i ++) {
                // 把图片字符串去掉(不然返回回去页面会显示一堆图片字符串)
                result[i].content = result[i].content.replace(/<img[\w\W]*">/, '');
                // 去掉标签
                result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, '');
                // 展示0到300和字符串
                result[i].content = result[i].content.substring(0, 300)
            }
            // 对返回的数据做处理
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
    });
}
path.set('/queryBlogByPage', queryBlogByPage);

// 查询blog总数
function queryBlogCount (request, response) {
    blogDeo.queryBlogCount(function (result) {
        // 对返回的数据做处理
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryBlogCount', queryBlogCount);

//根据id来查询blog
function queryBlogById (request, response) {
    var params = url.parse(request.url, true).query;
    blogDeo.queryBlogById(params.bid, function (result) {
        // 对返回的数据做处理
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
        // 请求数据库表blog对views做出修改（+1）
        blogDeo.addViews(params.bid, function (result) {
            // console.log(result);
        });
    });
}
path.set('/queryBlogById', queryBlogById);

// 根据views来查询blog
function queryHotBlog (request, response) {
    blogDeo.queryHotBlog(7, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryHotBlog', queryHotBlog);

// 根据搜索内容查blog
function queryBlogBySearchText (request, response) {
    var params = url.parse(request.url, true).query;
    blogDeo.queryBlogBySearchText(params.searchText, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryBlogBySearchText', queryBlogBySearchText);

// 查根据搜索内容查出的blog总数
function queryBlogCountBySearchText (request, response) {
    var params = url.parse(request.url, true).query;
    blogDeo.queryBlogCountBySearchText(params.searchText, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryBlogCountBySearchText', queryBlogCountBySearchText);

// 查询所有blog文章
function queryAllBlog (request, response) {
    blogDeo.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryAllBlog', queryAllBlog);

// 查询表tag
function queryTag (tag, blogId) {
    tagsDeo.queryTag(tag, function (result) {
        // 如果查询的内容为空，则表示tags里面没有数据
        //console.log(result);
        // 注意这里的result, 查询数据库表里没有对应的数据会返回一个[]（空数组，而不是会返回失败结果）
        // 所以这里要再加一个数组长度判断
        if (!result || result.length == 0) {    
            // 那么就插入tag
            insertTag(tag, blogId);
        } else {
            //若果查询有内容，那么就直接插入tag和blog的映射
            insertTagBlogMapping(result[0].Id, blogId);
        }
    });
}

// 插入tag
function insertTag (tag, blogId) {
    tagsDeo.insertTag(tag, timeUtil.getDateNow(), timeUtil.getDateNow(), function (result) {
        // 插入映射(多个tag对应同一个blog)
        // 这里的result.insertId就是表tags的数据id
        insertTagBlogMapping(result.insertId, blogId);
    });
}

// 插入 tag与blog的映射
function insertTagBlogMapping (tagId, blogId) {
    tagsBlogMappingDeo.insertTagBlogMapping(tagId, blogId, timeUtil.getDateNow(), timeUtil.getDateNow(), function (result) {

    });
}

module.exports.path = path;