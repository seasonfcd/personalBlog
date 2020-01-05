// 读物文件路径下的所有模块并引进模块
var fs = require('fs');
var globalConfi = require('./config');

var controllerSet = [];
var pathMap = new Map();


    // 读取某个文件夹下的所有文件路径(以数组的形式里面是字符串)
    var files = fs.readdirSync(globalConfi['web_path']);
    // console.log(files);

    for (var i=0; i < files.length; i++) {
        // 直接require则引入的是modules.exports，是一个空对象；这里引入了文件夹下所有有导出的（有module.exports=xxx）js模块
        // 因为导出是modules.exports.path，所以这个对象里面有path属性
        var temp = require( globalConfi['web_path'] + '/' + files[i]);  //各个模块所导出的对象
        // 判断是否存在路径，有才加进数组（不存在添加就没有意义）
        // console.log(temp); 
        if (temp.path) {
            // 对temp.path里的map对象进行遍历
            for (var [key, value] of temp.path) {
                // 注意：这里for里面套for，不容易理解
                // 判断重复的方法就是第二次遍历map对象，key值是否与第一次遍历得到的map对象里的key值相同（第一次遍历之前，map对象是空的，所以第一次是一定有结果的）
                // 判断key是否重复(web夹文件路径下里的js模块是否有重复的函数)，Map对象不存在重复的key，有重复的会覆盖前面的
                // 由于for循环（最外面的），第一次循环pathMap.get(key)肯定不存在，第二次循环，由于第一次已经设置了，如果有重复的（代表第二次的循环里的key有与第一次里的key相同）
                // 那么pathMap.get(key)里的key在pathMap里有相应的value值。
                // 这样判断是为了不让各个js模块里出现同样的函数名
                if (!pathMap.get(key)) {
                    //console.log(key, value);
                    pathMap.set(key, value); 
                    
                    
                    // console.log(pathMap);       
                } else {
                    throw new Error('url path异常, url:' + key);
                }
                controllerSet.push(temp);
                
            }
            
        }
        
    }


// console.log(controllerSet);
module.exports = pathMap;

