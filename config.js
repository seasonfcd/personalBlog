// 读取配置文件（server.conf）
var fs = require('fs');
var globalConfi = {};
var confi = fs.readFileSync('./server.conf');
// console.log(confi.toString());
var confiArr = confi.toString().split('\r\n');
for (var i = 0; i < confiArr.length; i++) {
    globalConfi[confiArr[i].split('=')[0]] = confiArr[i].split('=')[1];
}

module.exports = globalConfi;