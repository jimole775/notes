//范例：
myModule.directive('namespaceDirectiveName', function factory(injectables) {

    return {

        restrict: String,   //指令的使用方式，包括标签，属性，类，注释
        priority: Number,   //指令执行的优先级
        template: String,   //指令使用的模板，用HTML字符串的形式表示
        templateUrl: String,    //从指定的url地址加载模板
        replace: Boolean,   //是否用模板替换当前元素，若为false，则append在当前元素上
        transclude: Boolean,    //是否将当前元素的内容转移到模板中
        scope: [Boolean | Object],  //指定指令的作用域

        controller: function controllerConstructor($scope, $element, $attrs, $transclude) { //定义与其他指令进行交互的接口函数
            //...
        },

        require: String,    //引入其他的模块或数据，一般都尝试引入directive或者controller模块名(引入后可以直接调用controller内部的this对象)

        link: function postLink(scope, iElement, iAttrs) {  //以编程的方式操作DOM，包括添加监听器等（注意和controller的区别）

                scope.$evalAsync(function(){
                    // executes after compile/link
                    // and before render
                });
                $timeout(function(){
                    // executes after render
                })

        },

        compile: function compile(tElement, tAttrs, transclude) {   //编程的方式修改DOM模板的副本，可以返回链接函数

            return {

                pre: function preLink(scope, iElement, iAttrs, controller) {
                    //...
                },

                post: function postLink(scope, iElement, iAttrs, controller) {
                    //...
                }

            }

        }
    };

});