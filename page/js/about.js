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
                // 检验验证码是否正确
                if (code != that.rightCodeValue) {
                    alert('验证码错误');
                    return;
                }
                
                // 这里的bid为-1代表不是blog页面的评论(因为评论都在一个数据库表里，用bid来区分是不是blog页面的评论，用parent来区分是blog页面（-1）还是关于页面（-2）还是留言页面（-3）的评论)
                var bid = -1;
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
                    //console.log(resp);
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

// var blogComments = new Vue({
//     el: '#blog_comments',
//     data: {
//         total: 0,
//         commentsList:[]
//     },
//     computed: {
//         reply(commentId, commentName){
//             return function (commentId, commentName) {
//                 // 在哪个评论回复，就记录评论在表中的id位置，然后传给（通过改变表单的值）要回复的评论的parent值
//                 // 一下两个表单是隐藏的，不改变的话，发送评论都是传送一样的值，下面改变值的话，传送的值也就改变了
//                 document.getElementById('comment_reply').value = commentId,
//                 document.getElementById('comment_reply_name').value = commentName;
//                 location.href = "#send_comments";
//             }
//         }
//     },
//     created() {
//         var that = this;
//         // console.log(searchUrlParams);
//         var bid = -1;
//         // 获取关于页面的评论，不需要博客id，只需要bid都是-1的评论
//         // -1表示关于页面的评论，为正数表示博客页面哪个博客下的评论
//         axios({
//             method: 'get',
//             url:'/queryCommentsByBlogId?bid=' + bid
//         }).then(function (resp) {
//             // console.log(resp);
//             that.commentsList = resp.data.data;
//             for (var i = 0; i < that.commentsList.length; i ++) {
//                 // 判断parent是否大于1，大于1代表是在哪条评论上回复的
//                 if (that.commentsList[i].parent > -1) {
//                     that.commentsList[i].options = '回复@' + that.commentsList[i].parent_name;
//                 }
//             }
//         }).catch(function (resp) {
//             console.log('请求失败');
//         });
//         // 获取评论总数
//         axios({
//             method: 'get',
//             url: '/queryCommentsCountByBlogId?bid=' + bid
//         }).then(function (resp) {
//             // console.log(resp);
//             that.total = resp.data.data[0].count;
//         }).catch(function (resp) {
//             console.log('请求错误');
//         });
//     }
// });