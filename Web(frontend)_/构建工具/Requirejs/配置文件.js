require.config({
    baseUrl: 'js/',
    urlArgs: 'xxx' , //给加载文件添加版本后缀，迭代用
    waitSeconds: 0,
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
    map: { 
        '*': {
            'css': 'libs/css.min'
        }
    }
});

