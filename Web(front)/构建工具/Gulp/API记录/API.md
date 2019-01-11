gulp主要的API有4个：
***glob为文件路径语法


=====================|gulp.src|==========================
# src之后，会返回node的stream流对象
# 可以使用stream的pipe方法把数据往下传
gulp.src(glob[,options]);


=====================|gulp.watch|==========================
# 主要监听文件的变动
# 触发事件是已定义的task,以数组的形式传入
gulp.watch(glob[,options,tasks]));


=====================|gulp.dest|==========================
# 输出
# 注意参数是path,不是fileName
gulp.dest(path[,options]);


=====================|gulp.task|==========================
# 自定义任务
# 可以使用依赖项，当其他任务结束之后再运行当前项目
gulp.task(name[, deps], fn)

# 如果遇到异步操作的话，可以在第三个回调函数里，设置被依赖项的回调
# 比如：
gulp.task("async",function(cb){
    console.log("异步开启");
    setTimeout(function(){
        cb(); // runAsync
    },1000);
});

gulp.task("runAsync",["async"],function(cb){
    console.log("异步回调");
})



#剩下就是各种常用插件了：
#npm install --save-dev gulp-rename //修改文件名
#npm install --save-dev gulp-uglify //js压缩
#npm install --save-dev gulp-minify-css //css压缩
#npm install --save-dev gulp-minify-html //html压缩
#npm install --save-dev gulp-concat //js合并
#npm install --save-dev gulp-less //less编译
#npm install --save-dev gulp-sass //sass编译
#npm install --save-dev gulp-imagemin //图片压缩
#npm install --save-dev gulp-livereload //监听并动态刷新页面
#npm install --save-dev webpack-stream //webpack

```javascript
var gulp = require('gulp'),                        //基础库
    clean = require('gulp-clean'),                 //清空文件夹
    minify = require('gulp-minify-css'),           //css压缩
    rename = require('gulp-rename'),               //文件重命名
    revContent = require('gulp-rev'),                     //更改版本名
    revCollector = require('gulp-rev-collector'),     //gulp-rev的插件，用于html文件更改
    notify = require('gulp-notify'),               //提示
    htmlreplace = require('gulp-html-replace'),
    replace = require('gulp-replace'),
    htmlmin = require('gulp-htmlmin'),
    livereload = require('gulp-livereload');
```


引用：https:#www.cnblogs.com/2050/p/4198792.html