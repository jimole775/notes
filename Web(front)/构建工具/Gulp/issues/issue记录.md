# TypeError: Cannot read property 'apply' of undefined
## Solution: 
try commandLine 'npm install gulp-cli -g'

*** 和node版本，或者当前项目的运行环境有关，试着重装一遍都会有结果 ***

# TypeError: The following tasks did not complete: xxx
## Solution: 
The gulp version was occurred, need turn it below v4.0. otherwise, adjusts the syntax fit on v4.0 version.

``` js
const shell = require('gulp-shell') 
// only run a third part task
gulp.task('a', shell.task('b'))
```

# Task function must be specified
## Solution:
This is a v4.0 run dependces tasks problem, need to do like this:
``` js
gulp.task('a', gulp.series('b','c',function(){
    return gulp.src()...
}))
gulp.task('a', gulp.parallel('b','c',function(){
    return gulp.src()...
}))
```