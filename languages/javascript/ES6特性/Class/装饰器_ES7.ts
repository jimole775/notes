/**
 * Created by Andy on 2017/9/9.
 */

/**这是一个ES7的提案，所以，只能在babel里面使用*/

/**根据一个最重要的特性--【编译时运行】，
 * 可以为所有单元测试案例设置一个总开关（也可以说的全局变量）
 * 来控制所有测试案例的代码是否生成~*/
let global = {
    testable : true
};
function testable(flag) {
    if(flag === true){
        return function(target){
            //testFun(target);
            console.log(target);
        }
    }
}

@testable(global.testable)
class Foo{
    constructor(){}
    @readonly
    static bar = "just read~";
}

function readonly(target){
    console.log(target);
}



/**注意事项：*/
//1，在修饰函数的时候，注意函数声明提升的问题
//2，
