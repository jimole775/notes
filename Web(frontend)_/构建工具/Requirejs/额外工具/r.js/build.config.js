/**
 * Created by houxingzhang on 2016-09-05.
 */
({
    baseUrl:"js/",
    paths: { //配置路径别名
        jquery:'...path/libs/jquery',
        jqueryUI:'...path/libs/jquery-ui',
        lodash:'...path/libs/lodash'
    },
    shim: {
        'jqueryUI': { //配置依赖关系
            deps: ['jquery'],
            exports: 'jqueryUI'
        }
    },
    uglify2: { //压缩选项配置
        //Example of a specialized config. If you are fine（特殊配置）
        //with the default options, no need to specify（如果默认配置已经能正常执行）
        //any of these properties.（没必要折腾这些这些属性）
        output: {
            beautify: false //是否压缩
        },
        compress: {
            sequences: true, //压缩的时候是否严格按照文件队列进行？反正我选false的时候，压缩的文件会报错
            global_defs: {
                DEBUG: true //未知选项
            }
        },
        warnings: true, //是否报黄
        mangle: false //未知选项，选true，我的项目报错了
    },
    name: 'app', //入口文件名
    out: './js/app.common.js', //输出路径
    useStrict: true //严谨模式
});



