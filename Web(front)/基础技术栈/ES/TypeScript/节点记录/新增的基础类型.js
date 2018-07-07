//相对于ES6之后，新增的标准数据类型；
/*=====枚举类型=====*/
var Names;
(function (Names) {
    Names[Names["John"] = 0] = "John";
    Names[Names["Andy"] = 1] = "Andy";
    Names[Names["jane"] = 2] = "jane";
})(Names || (Names = {})); //和创建Class类似
var myName = Names[1]; //Andy
var pickAnother = Names.John; //0
console.log(myName, pickAnother);
/*=====any类型=====*/
var foo = "bar";
//foo.toFixed();  //虽然字串类型没有toFixed方法，但是，这里不会报错;*****ts转译的时候不会报错，但是转译后的js执行还是一样会报错
var foo1 = "bar";
//foo1.toFixed();  //Error;
/*=====void类型=====*/
function foo2() {
}
var takeReturn = foo2();
console.log(takeReturn); //没有返回值的时候，其返回值类型是 void；*****不过在转译之后，还是一样返回undefined
//# sourceMappingURL=新增的基础类型.js.map