var everyDayDeo = require('../deo/everyDayDeo');
var respUtil = require('../util/respUtil');
var timeUtil = require('../util/timeUtil');
var path = new Map();

function editEveryDay (request, response) {
    // post请求数据(不带参数，带参数就在url里)在data事件里
    request.on('data', function (data) {
        // console.log(data.toString());
        everyDayDeo['insertEveryDay'](data.toString().trim(), timeUtil.getDateNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
        });
    });
}

function queryEveryDay (request, response) {
    // get请求不用data事件

        everyDayDeo['queryEveryDay'](function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result));
            response.end();
        });
}


path.set('/editEveryDay', editEveryDay);
path.set('/queryEveryDay', queryEveryDay);
module.exports.path = path;