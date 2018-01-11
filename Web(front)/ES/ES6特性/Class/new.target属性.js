/**
 * Created by Andy on 2017/9/2.
 */
class Animal {
    constructor(a,b){
        console.log(a,b);
    }
}
class Cat extends Animal {
    //static self = new.target; //静态属性属于ES7特性
    constructor(a,b){
        super(a,b); //承接父类的constructor
        let self = new.target;  //获取子类对象本身
        console.log("say something");
    }
}

var cat = new Cat("a","b");