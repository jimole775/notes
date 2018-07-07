/**
 * Created by Andy on 2017/11/12.
 */

/**现阶段测试,只有【父子级】的directive才会使这个require属性生效,
 如果需要在同级使用的话,需要借助【$scopeProvider】注入~*/

//html:
String(
    `
    <father>
        <son>

        </son>
    </father>
    `
);

//js:
angular.module("app", [])
    .directive("father", function () {
        return {
            controller: function () {
                this.export = "got me!";
            }
        }
    }).directive("son", function () {
        return {
            require:"^father",
            //require:"son",    //如果require的是son，就相当于把当前的ctrl导入到LINK中
            link:function(A,B,C,D){ //必须是在第四个参数传入
                console.log("what is required:",D);
            }
        }
    }
);


/**以上就那么简单就执行了~~*/

