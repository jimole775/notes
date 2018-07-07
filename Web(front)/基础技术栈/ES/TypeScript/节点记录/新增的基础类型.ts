//相对于ES6之后，新增的标准数据类型；

/*=====枚举类型=====*/
enum Names {John, Andy, jane}  //和创建Class类似
let myName:string = Names[1];   //Andy
let pickAnother:number = Names.John;    //0
console.log(myName,pickAnother);

/*=====any类型=====*/
let foo:any = "bar";
//foo.toFixed();  //虽然字串类型没有toFixed方法，但是，这里不会报错;*****ts转译的时候不会报错，但是转译后的js执行还是一样会报错

let foo1:string = "bar";
//foo1.toFixed();  //Error;

/*=====void类型=====*/
function foo2():void {   //某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。
}
var takeReturn = foo2();
console.log(takeReturn);    //没有返回值的时候，其返回值类型是 void；*****不过在转译之后，还是一样返回undefined

