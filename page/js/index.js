//每日一句
var everyDay = new Vue({
    el: '#every_day',
    data: {
        content: 'aaaaaaaaaaaaa'
    },
    computed: {
        getContent() {
            return this.content;
        }
    },
    created(){
        var that = this;
        // 请求数据，给content赋值
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(function (resp) {
            that.content = resp.data.data[0].content;
            // console.log(resp);
        }).catch(function (resp) {
            console.log('请求失败');
        });
    }
});

// 博客文章
var articleList = new Vue({
    el: '#articleId_list',
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: [{
            title: 'Vue history模式编译后nginx无法访问的问题',
            content: 'Vue的项目，使用history路由模式相比hash模式来说，url会比较美观。但新手在把项目编译后并使用nginx配置访问时，点击其它页时会空白，F12查看请求，返回304，并且提示“We’re sorry but xxxxxx doesn’t work properly without JavaScript enabled. Please enable it to continue。我解决的方法是首先在nginx里要正确配置好了urlrewrite：location / {        tr... Vue的项目，使用history路由模式相比hash模式来说，url会比较美观。但新手在把项目编译后并使用nginx配置访问时，点击其它页时会空白，F12查看请求，返回304，并且提示“We’re sorry but xxxxxx doesn’t work properly without JavaScript enabled. Please enable it to continue。我解决的方法是首先在nginx里要正确配置好了urlrewrite：location / {        tr...',
            date: '2019-11-28',
            views:'178',
            tag: 'vue',
            id:'1',
            link:'/'
        },{
            title: 'Vue history模式编译后nginx无法访问的问题',
            content: 'Vue的项目，使用history路由模式相比hash模式来说，url会比较美观。但新手在把项目编译后并使用nginx配置访问时，点击其它页时会空白，F12查看请求，返回304，并且提示“We’re sorry but xxxxxx doesn’t work properly without JavaScript enabled. Please enable it to continue。我解决的方法是首先在nginx里要正确配置好了urlrewrite：location / {        tr... Vue的项目，使用history路由模式相比hash模式来说，url会比较美观。但新手在把项目编译后并使用nginx配置访问时，点击其它页时会空白，F12查看请求，返回304，并且提示“We’re sorry but xxxxxx doesn’t work properly without JavaScript enabled. Please enable it to continue。我解决的方法是首先在nginx里要正确配置好了urlrewrite：location / {        tr...',
            date: '2019-11-28',
            views:'178',
            tag: 'vue',
            id:'1',
            link:'/'
        },{
            title: 'Vue history模式编译后nginx无法访问的问题',
            content: 'Vue的项目，使用history路由模式相比hash模式来说，url会比较美观。但新手在把项目编译后并使用nginx配置访问时，点击其它页时会空白，F12查看请求，返回304，并且提示“We’re sorry but xxxxxx doesn’t work properly without JavaScript enabled. Please enable it to continue。我解决的方法是首先在nginx里要正确配置好了urlrewrite：location / {        tr... Vue的项目，使用history路由模式相比hash模式来说，url会比较美观。但新手在把项目编译后并使用nginx配置访问时，点击其它页时会空白，F12查看请求，返回304，并且提示“We’re sorry but xxxxxx doesn’t work properly without JavaScript enabled. Please enable it to continue。我解决的方法是首先在nginx里要正确配置好了urlrewrite：location / {        tr...',
            date: '2019-11-28',
            views:'178',
            tag: 'vue',
            id:'1',
            link:'/'
        }],
    },
    computed: {
        getPage() {
            /*
                为什么在这里打印的articleList 和在axios里的打印的articleList不同
                    一个是undefined,一个是vue对象、
                而function里的打印的也是undefined
             */
            // console.log(articleList);
            // console.log(this);
            var that = this;
            return function (page, pageSize) {
                // console.log(articleList);
                // console.log(this);
                // 获取浏览器里的路劲并进行判断和拆分
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&'): '';
                // console.log(searchUrlParams);
                var tag = '',
                    searchText = '';
                // 获取url后面?的tag属性或者searhText属性
                for (var i = 0; i < searchUrlParams.length; i ++) {
                    if (searchUrlParams[i].split('=')[0] == 'tag') {
                        try {
                            tag = searchUrlParams[i].split('=')[1];
                            // console.log(tag);
                        } catch (e) {
                            console.log(e);
                        }
                    } else if (searchUrlParams[i].split('=')[0] == 'searchText') {
                        try {
                            searchText = searchUrlParams[i].split('=')[1];
                            console.log(searchText);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                
                
                if (tag) {  // tag有内容时
                    console.log(11111);
                    console.log(tag);
                    // 查选中一个随机标签中的blog
                    axios({
                        method: 'get',
                        url: '/queryTagId?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag='+ tag
                    }).then(function (resp) {
                        // console.log(resp);
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tag = result[i].tags;
                            temp.id = result[i].id;
                            // a 标签跳转地址
                            temp.link = '/blog_detail.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        that.articleList = list;
                        that.page = page;
                    }).catch(function (resp) {
                        console.log(resp);
                    });
                    
                    // 查选中一个随机标签中的blog总数据
                    axios({
                        method: 'get',
                        url: 'queryTagIdCount?tag=' + tag
                    }).then(function (resp) {
                        console.log(resp);
                        // 分页展示
                        that.count = resp.data.data[0].count;
                        that.generatePageTool;
                    }).catch(function (resp) {
                        console.log(resp);
                    });

                
                } else if (searchText) {    // 当serachText不为空时，说明是点击搜索来过滤bolg
                    // 根据搜索内容请求响应的数据（这里对数据库做模糊搜索）
                    axios({
                        method: 'get',
                        url: '/queryBlogBySearchText?page=' + (page - 1) + '&pageSize=' + pageSize + '&searchText=' + searchText
                    }).then(function (resp) {
                        console.log(resp);
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tag = result[i].tags;
                            temp.id = result[i].id;
                            // a 标签跳转地址
                            temp.link = '/blog_detail.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        that.articleList = list;
                        that.page = page;
                    }).catch(function (resp) {
                        console.log(resp);
                    });

                    // 查根据搜索内容搜出的blog总数
                    axios({
                        method: 'get',
                        url: '/queryBlogCountBySearchText?searchText=' + searchText
                    }).then(function (resp) {
                        console.log(resp);
                        // 分页展示
                        that.count = resp.data.data[0].count;
                        that.generatePageTool;
                    }).catch(function (resp) {
                        console.log(resp);
                    });
                
                } else {    // tag和serachText为空说明不是根据tag标签或搜索内容来过滤blog文章，不为空时说明有tag，那就筛选出带有tag标签的blog文章
                    // 请求blog数据
                    axios({
                        method: 'get',
                        url:'/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(function (resp) {
                        // console.log(articleList);
                        // console.log(this);
                        // console.log(resp);
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tag = result[i].tags;
                            temp.id = result[i].id;
                            // a 标签跳转地址
                            temp.link = '/blog_detail.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        that.articleList = list;
                        that.page = page;
                    }).catch(function (resp) {
                        console.log('请求错误');
                    });
                    // 请求blog数量总数
                    axios({
                        method: 'get',
                        url:'/queryBlogCount'
                    }).then(function (resp) {
                        // console.log(resp);
                        // 分页展示
                        that.count = resp.data.data[0].count;
                        that.generatePageTool;
                        // console.log(that.pageNumList);
                    }).catch(function (resp) {
                        console.log('请求错误');
                    });
                    // axios是异步的，所以没等到请求完成下面的代码就会执行，如果是依赖请求后的数据的话那么把代码放进请求里
                
                }

                
            }
        },

        generatePageTool() {
            /*
             * 分页功能思路：（数组对象text属性值和page属性值都相同，以用来判断点击发生改变的时候CSS颜色变化也发生改变）
             *     利用vue的v-for循环随着数据的变化而不断变化的特点来初始化一个数组，数组里面是个数不确定的对象，对象属性名固定为text和page
             * 先分上一页和下一页的情况，再分当前页数较大和较小的情况（利用各数值的变化来建立一个公式）
             */
            var nowPage = this.page,    // 当前所在页数（随着点击（下一个当前页数）的变化而变化）
                pageSize = this.pageSize,   // 每页个数（固定量）
                totalCount = this.count,    // 总数量（随着数据库里的数据总量变化而变化）
                result = [];    // 初始化数组，用来存储各变化量，并最后赋给pageNumList
            // 刚开始先push上一页
            var maxPage = Math.ceil(totalCount / pageSize);
            console.log(maxPage);
            result.push({text:'上一页', page: nowPage - 1 });   // 8-1 / 5
            // 这是当当前所在页数在较大的数时所作的处理
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            // 如果小于等于1，那么就把当前页面数push进去
            result.push({text:  nowPage, page: nowPage});
            //console.log((totalCount + pageSize - 1) / pageSize);
            // 当总数小于每页个数时，为一页，当总数大于每页个数时，计算总数是每页个数的多少倍

            // 如果满足下面计算条件，则把当前页面数加1再push进去
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {    // 1+1 <= (8+5-1) / 5
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            // 如果满足下面计算条件，则把当前页面数加2再push进去
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {    // 1+2 <= (8+5-1) / 5
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            // 最后把下一页push进去
            result.push({text: '下一页', page: nowPage >= maxPage ? maxPage : nowPage + 1});  // 向下取整(11+5-1) / 5 
            this.pageNumList = result;
            return result;
        

        },

        jumpToPage() {
            var that = this;
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        }
    },

    created(){
        this.getPage(this.page, this.pageSize);
    }
});

