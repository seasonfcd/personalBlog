var blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        title: '',
        content: '',
        ctime: '',
        tags: '',
        views: ''
    },
    computed: {

    },
    created() {
        var that = this;
        // 获取浏览器里的路劲并进行判断和拆分
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&'): '';
        if (searchUrlParams == '') {
            return;
        }
        // console.log(searchUrlParams);
        var bid;
        // 获取url后面?的bid属性
        for (var i = 0; i < searchUrlParams.length; i ++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        // console.log(bid);
        //发送请求
        axios({
            method: 'get',
            url: '/queryBlogById?bid=' + bid
        }).then(function (resp) {
            // console.log(resp);
            var result = resp.data.data[0];
            that.title = result.title;
            that.content = result.content;
            that.ctime = result.ctime;
            that.tags = result.tags;
            that.views = result.views;
        }).catch(function (resp) {
            console.log('请求失败');
        });
    }
});

var sendComments = new Vue({
    el: '#send_comments',
    data: {
        codeValue:'',
        rightCodeValue: ''
    },
    computed: {
        addComments_ () {
            return function () {
                var that = this;
                var code = document.getElementById('comment_code').value;
                if (code != that.rightCodeValue) {
                    alert('验证码错误');
                    return;
                }
                // 获取浏览器里的路劲并进行判断和拆分
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&'): '';
                if (searchUrlParams == '') {
                    return;
                }
                // console.log(searchUrlParams);
                var bid;
                // 获取url后面?的bid属性
                for (var i = 0; i < searchUrlParams.length; i ++) {
                    if (searchUrlParams[i].split('=')[0] == 'bid') {
                        try {
                            bid = parseInt(searchUrlParams[i].split('=')[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                var reply = document.getElementById('comment_reply').value,
                    replyNname = document.getElementById('comment_reply_name').value,
                    name = document.getElementById('comment_name').value,
                    email = document.getElementById('comment_email').value,
                    content = document.getElementById('comment_content').value;
                axios({
                    method: 'get',
                    url: '/addComments?bid=' + bid + '&parent=' + reply + '&username=' + name + '&email=' + email + '&content=' + content + '&parentName=' + replyNname
                }).then(function (resp) {
                    // console.log(resp);
                    alert("发送评论成功");
                }).catch(function (resp) {
                    console.log('请求失败');
                });
            }
        },

        randomCode() {
            var that = this;
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomCode'
                }).then(function (resp) {
                    console.log(resp);
                    that.codeValue = resp.data.data.data;
                    that.rightCodeValue = resp.data.data.text; 
                }).catch();
            }
        }
    },
    created() {
        this.randomCode();
    }
});

var blogComments = new Vue({
    el: '#blog_comments',
    data: {
        total: 0,
        commentsList:[{
            bid:'',
            username: '',
            ctime: '',
            comments: ''
        }]
    },
    computed: {
        reply(commentId, commentName){
            return function (commentId, commentName) {
                document.getElementById('comment_reply').value = commentId,
                document.getElementById('comment_reply_name').value = commentName;
                location.href = "#send_comments";
            }
        }
    },
    created() {
        var that = this;
        // 获取浏览器里的路劲并进行判断和拆分
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&'): '';
        if (searchUrlParams == '') {
            return;
        }
        // console.log(searchUrlParams);
        var bid;
        // 获取url后面?的bid属性
        for (var i = 0; i < searchUrlParams.length; i ++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        // 获取评论
        axios({
            method: 'get',
            url:'/queryCommentsByBlogId?bid=' + bid
        }).then(function (resp) {
            console.log(resp);
            that.commentsList = resp.data.data;
            for (var i = 0; i < that.commentsList.length; i ++) {
                // 判断parent是否大于1，大于1代表是在哪条评论上回复的
                if (that.commentsList[i].parent > -1) {
                    // 这里的options属性是临时加上的，临时使用
                    that.commentsList[i].options = '回复@' + that.commentsList[i].parent_name;
                }
            }
        }).catch(function (resp) {
            console.log('请求失败');
        });
        // 获取评论总数
        axios({
            method: 'get',
            url: '/queryCommentsCountByBlogId'
        }).then(function (resp) {
            console.log(resp);
            that.total = resp.data.data[0].count;
        }).catch(function (resp) {
            console.log('请求错误');
        });
    }
});