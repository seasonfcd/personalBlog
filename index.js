//主入口文件
var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');
var app = new express();
console.log(loader);

// 监听静态资源(默认下是index.html页面)
app.use(express.static(globalConfig['page_path']));
// 监听端口
app.listen(globalConfig['port'], function () {
    console.log('服务已启动');
});

// 关于每日一句的请求
//post请求 添加每日一句数据到数据库
app.post('/editEveryDay', loader.get('/editEveryDay'));
//get请求 查询每日一句里数据库里的数据
app.get('/queryEveryDay', loader.get('/queryEveryDay'));

// 关于文章的请求
// 添加表blog的同时，添加表tags，添加表blog_tags_mapping
app.post('/editBlog', loader.get('/editBlog'));
// 从数据库里获取blog数据
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
// 从blog里获取数据总量count
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
// 根据id来获取blog
app.get('/queryBlogById', loader.get('/queryBlogById'));


// 添加评论到comments表(带图片用post, 字符串用get)
app.get('/addComments', loader.get('/addComments'));
// 随机验证码
app.get('/queryRandomCode', loader.get('/queryRandomCode'));
// 根据blog_id来获取评论
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));
// 获取评论总数
app.get('/queryCommentsCountByBlogId', loader.get('/queryCommentsCountByBlogId'));
// 获取所有的blog文章
app.get('/queryAllBlog', loader.get('/queryAllBlog'));

// 获取所有的tags
app.get('/queryRandomTags', loader.get('/queryRandomTags'));
// 获取热门blog
app.get('/queryHotBlog', loader.get('/queryHotBlog'));
// 获取最新评论
app.get('/queryNewComments', loader.get('/queryNewComments'));
// 查询tag_id
app.get('/queryTagId', loader.get('/queryTagId'));
// 查询tag_id总数
app.get('/queryTagIdCount', loader.get('/queryTagIdCount'));

// 根据搜索内容查blog
app.get('/queryBlogBySearchText', loader.get('/queryBlogBySearchText'));
// 查根据搜索内容查出的blog总数
app.get('/queryBlogCountBySearchText', loader.get('/queryBlogCountBySearchText'));

