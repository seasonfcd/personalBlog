// 读取配置文件（server.conf）
var fs = require('fs');
var globalConfi = {};
var confi = fs.readFileSync('./server.conf');   // 读取文件的结果是Buffer形式的数据，需要转换成字符串
// console.log(confi.toString());
var confiArr = confi.toString().split('\n');  // 注意：在linux上运行的时候换行符是\n。记得改过来
for (var i = 0; i < confiArr.length; i++) {
    globalConfi[confiArr[i].split('=')[0]] = confiArr[i].split('=')[1];
}
console.log(globalConfi);
module.exports = globalConfi;