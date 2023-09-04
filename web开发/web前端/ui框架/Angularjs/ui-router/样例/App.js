/**
 * Created by Andy on 2017/1/26.
 */
var myApp = angular.module("myApp", ["ui.router"]);

myApp.config(function ($provide, $stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.deferIntercept(true);
    $urlRouterProvider.when("", "/page1")//������·�ɣ��ض���page1
        .otherwise("page1", {//����Ĭ��ҳ��
            url: "/page1",
            templateUrl: "page1.html"
        });
    $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "PageTab.html"
        })
        .state("page1", {
            url: "/page1",
            templateUrl: "page1.html",
            controller: ["$stateParams", "$state", "$urlRouter", function ($stateParams, $state, $urlRouter) {
                console.log($stateParams.text);// 1  ����ʵ�ִ���
                console.log($state);
                console.log($urlRouter);
                $urlRouter.sync();
                $urlRouter.listen();
            }],
            params: {text: "hello world"}
        })
        .state("page2", {
            url: "/page2",
            templateUrl: "page2.html"
        })
        .state("page3", {
            url: "/page3",
            templateUrl: "page3.html"
        });
    $provide.provider('ws',function(){
        this.$get = function(){
            return {
                message: 'xiaoguoping'
            }
        }
    });
}).controller("test", ["ws", function (ws) {
    console.log(ws)
}]);

