/**
 * Created by Andy on 2017/8/28.
 */

/**新鲜词汇*/
//结构子类型：
//名义类型系统：
//结构类型系统：


//所谓类型兼容，就是一个数据的结构定义时，内部属性会向前兼容（？或许会找到更好的描述）
interface Foo{
    name:string;
}

let bar = {name:"andy",age:10};

let foo:Foo;
foo = bar;  //赋值过来后，不会报错

console.log(foo.name);


function getter(arg:Foo){
    return arg.name;
}

getter(bar);    //赋值过来后，不会报错


