// 随机标签
var randomTags = new Vue({
    el: '#random_tags',
    data: {
        tagList: []
    },
    computed: {
        // 随机颜色
        randomColor(){
            // 这里返回函数是为了让每次结果不一样
            return function () {
                var red = Math.random() * 256,
                green = Math.random() * 256,
                blue = Math.random() * 256;
                return 'rgb(' + red + ',' + green + ',' + blue + ')';
            }
            
        },
        // 随机大小
        randomSize() {
            return function () {
                var size = Math.random() * 20 + 12;
                return size + 'px';
            }
            
        }
    },
    created(){
        var that = this;
        // 请求tag数据
        axios({
            method: 'get',
            url: '/queryRandomTags'
        }).then(function (resp) {
            // console.log(resp);
            for (var i = 0; i < resp.data.data.length; i ++) {
                var result = {}
                result.tag = resp.data.data[i].tag;
                // 添加路径，点击标签时能够根据标签来过滤blog（对应index.js里的第90行）
                // 这是准备给a标签的href赋值的，把tag加进路径里，方便根据tag进行判断
                result.link = '/index.html?tag=' + resp.data.data[i].tag;
                that.tagList.push(result);
            }
        }).catch(function (resp) {
            console.log('请求失败');
        });
    }
});

// 最近热门
var newComments = new Vue({
    el: '#new_comments',
    data: {
        commentsList: []
    },
    computed: {

    },
    created() {
        var that = this;
        // 根据views获取blog
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then(function (resp) {
            for (var i = 0; i < resp.data.data.length; i ++) {
                var result = {};
                result.comment = resp.data.data[i].title;
                result.link = '/blog_detail.html?bid=' + resp.data.data[i].id;
                that.commentsList.push(result);
            }
        }).catch(function (resp) {
            console.log(resp);
        });
    }
});

// 最新评论
var newLink = new Vue({
    el: '#new_link',
    data: {
        linksList:[]
    },
    computed: {

    },
    created() {
        var that = this;
        // 获取最新评论
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(function (resp) {
            // console.log(resp);
            for (var i = 0; i < resp.data.data.length; i ++) {
                var result = {};
                result.name = resp.data.data[i].user_name;
                result.date = resp.data.data[i].ctime;
                result.comment = resp.data.data[i].comments;
                result.link = '/blog_detail.html?bid=' + resp.data.data[i].blog_id;
                that.linksList.push(result);
            }
        }).catch(function (resp) {
            console.log(resp);
        });
    }
});

// 导航搜索
var searchBar = new Vue({
    el: '#search_bar',
    data: {

    },
    computed: {
        getSearchText() {
            return function () {
                var searchText = document.getElementById('search_text').value;
                location.href = '/index.html?searchText=' + searchText;
            }
        }
    },
    created(){

    }
});