``` js
var gulp = require('gulp')
var fs = require("fs")
var babelify = require('babelify')
var browserify = require('browserify')
var rename = require('gulp-rename')
var uglifyjs = require('gulp-uglifyjs')
 
var vendors = ['react','react-dom','jquery'];//定义不打包到js文件中的模块，或者vender公共模块

gulp.task('es2015', () => {
    browserify({
            entries: ['./src/main.js'],
            extensions: ['.js', '.jsx'],
            debug: true
        })
        .external(vendors) //这个功能就是排除打包某些模块的
        .transform(["babelify", {
            babelrc: false,
            presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react'],
            plugins: ['transform-decorators-legacy']
        }])
        .bundle()
        .pipe(fs.createWriteStream("bundle.js"));
})
gulp.task('vender', () => {
    var bf = browserify({
        debug: true
    });
    vendors.forEach(lib => {
        bf.require(lib);  //这里require公共模块，下面将额外打包vender的模块
    });
    bf.transform(["babelify", {
            babelrc: false,
            presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react'],
            plugins: ['transform-decorators-legacy']
        }])
        .bundle()
        .pipe(fs.createWriteStream("vender.js"));
})
gulp.task('uglifyjs', () => {
    gulp.src('./bundle.js')
        .pipe(uglifyjs())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('./dist'))
})
gulp.task('default', () => {
    gulp.run('vender');
    gulp.watch('./src/**/*.js', () => {
        gulp.run('es2015')
    })
})
```