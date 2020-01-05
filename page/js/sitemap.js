var blogList = new Vue({
    el:'#blog_list',
    data: {
        blogList: []
    },
    computed: {
        
    },
    created () {
        var that = this;
        // 获取所有的blog文章
        axios({
            method: 'get',
            url: '/queryAllBlog'
        }).then(function (resp) {
            console.log(resp);
            that.blogList = resp.data.data;
            for (var i = 0; i < resp.data.data.length; i ++) {
                resp.data.data[i].link = '/blog_detail.html?bid=' + resp.data.data[i].id;
            }  
        }).catch(function (resp) {
            console.log('请求失败');
        });
    }
});