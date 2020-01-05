var tagsDeo = require('../deo/tagsDeo');
var tagsBlogMappingDeo = require('../deo/tagsBlogMappingDeo');
var blogDeo = require('../deo/blogDeo');
var respUtil = require('../util/respUtil'); // 写进返回里的字符串
var timeUtil = require('../util/timeUtil'); // 当前时间秒数
var url = require('url');
var path = new Map();

function queryRandomTags (request, response) {
    tagsDeo.queryRandomTags(function (result) {
        result.sort(function () {
            // 每次刷新页面返回不同的排序??????
            return Math.random() > 0.5 ? true : false;
        });
        // console.log(result);
        // console.log(1111111111);
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryRandomTags', queryRandomTags);

// 通过查tag的出tag_id，在根据tag_id去查tag_blog_mapping得出blog_id，再根据blog_id查blog得出数据（同样的tag_id可能对应多个blog_id）
function queryTagId (request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    tagsDeo.queryTag(params.tag, function (result) {
        if (!result || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
        }
        // console.log(result); //这里的结果只有一个，在表tags里同样的tag只有一个， 而下面的mapping里tag_id可以重复，可以查出来多条数据
        // 根据查出来的tag_id去tag_blog_mapping中查blog_id
        tagsBlogMappingDeo.queryBlogIdInMapping(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
           // console.log(result);
           // 根据所有查出来的blog_id来查blog，把所有的结果存进数组里
           var blogList = [];
           for (var  i = 0; i < result.length; i ++) {
               blogDeo.queryBlogById(result[i].blog_id, function (result) {
                blogList.push(result[0]);
                console.log(result.length);
                console.log(blogList.length);
               });
           }
           // 这里需要把这个for循环阻塞一下，因为有依赖关系
           getResult(blogList, result.length, response);
        });
    });
}
path.set('/queryTagId', queryTagId);

function queryTagIdCount (request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    tagsDeo.queryTag(params.tag, function (result) {
        if (!result || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
        }
        tagsBlogMappingDeo.queryBlogCountInMapping(result[0].id , function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
        });
    });
}
path.set('/queryTagIdCount', queryTagIdCount);

// 阻塞函数
function getResult (blogList, len, response) {
    // 如果for循环没有走完的话，blogList是没有东西的，是个空数组，所以blogList.length为0
    // 没有走完那就等待一秒再走看for循环走完没有
    if (blogList.length < len) {
        console.log(2222222222222);
        setTimeout(function () {
            getResult(blogList, len, response)
        }, 10);
    } else {
        console.log('=====');
        console.log(blogList);
        // 处理返回的result的content
        for (var i = 0; i < blogList.length; i ++) {
            // 把图片字符串去掉(不然返回回去页面会显示一堆图片字符串)
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, '');
            // 去掉标签
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, '');
            // 展示0到300和字符串
            blogList[i].content = blogList[i].content.substring(0, 300)
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', blogList));
        response.end();
    }
}

module.exports.path = path;