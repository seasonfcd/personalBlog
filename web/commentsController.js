var commentsDeo = require('../deo/commentsDeo');
var respUtil = require('../util/respUtil'); // 写进返回里的字符串
var timeUtil = require('../util/timeUtil'); // 当前时间秒数
var url = require('url');
var captcha = require('svg-captcha');   // 验证码 
var path = new Map();

function addComments (request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    commentsDeo.insertComments(params.bid, params.parent, params.parentName, params.username, params.content, params.email, timeUtil.getDateNow(), timeUtil.getDateNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', null));
        response.end();
    });
}
path.set('/addComments', addComments);

// 随机验证码
function queryRandomCode (request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    // console.log(img);
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '添加成功', img));
    response.end();
}
path.set('/queryRandomCode', queryRandomCode);

// 最新评论
function queryNewComments (request, response) {
    commentsDeo.queryNewComments(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryNewComments', queryNewComments);

function queryCommentsByBlogId (request, response) {
    var params = url.parse(request.url, true).query;
    commentsDeo.queryCommentsByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

function queryCommentsCountByBlogId (request, response) {
    var params = url.parse(request.url, true).query;
    commentsDeo.queryCommentsCountByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryCommentsCountByBlogId', queryCommentsCountByBlogId);

module.exports.path = path;