/**
 * Created by Andy on 2017/8/26.
 */

/**几个生涩的词汇*/
//1，外部枚举&非外部枚举：以declare关键字创建的枚举对象
//2，常数成员：以常数为下标的成员（是称为下标吗？）
//3，常数枚举：以const关键字创建的枚举对象

const enum Foo {
    A,
    B = 2,
    C = B * 3,
    D = C << 1
}

console.log(Foo[0]);    //常数枚举只能获取常数值，没有反向映射，所以这里报错
console.log(Foo.C);
console.log(Foo.D);