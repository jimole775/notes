/**
 * Created by Andy on 2017/8/29.
 */

//混合继承，当然可以继承抽象类，也可以继承接口

class Cat {
    name:string;
    age:number;
    cry<T,U>(name:T,age:U):any{
        return {name,age};
    };
}