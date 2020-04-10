/**
 * Created by Andy on 2017/9/9.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**这是一个ES7的提案，所以，只能在babel里面使用*/
/**根据一个最重要的特性--【编译时运行】，
 * 可以为所有单元测试案例设置一个总开关（也可以说的全局变量）
 * 来控制所有测试案例的代码是否生成~*/
var global = {
    testable: true
};
function testable(flag) {
    if (flag === true) {
        return function (target) {
            //testFun(target);
            console.log(target);
        };
    }
}
var Foo = (function () {
    function Foo() {
    }
    Foo.bar = "just read~";
    __decorate([
        readonly
    ], Foo, "bar");
    Foo = __decorate([
        testable(global.testable)
    ], Foo);
    return Foo;
}());
function readonly(target) {
    console.log(target);
}
/**注意事项：*/
//1，在修饰函数的时候，注意函数声明提升的问题
//2，
//# sourceMappingURL=装饰器_ES7.js.map