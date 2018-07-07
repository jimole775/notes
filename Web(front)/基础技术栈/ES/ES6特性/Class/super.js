/**作用：super关键字用于访问父类的prototype对象,也就是说，它只用在继承当中，现阶段可以完全理解为super就是父类的constructor方法*/
/**语法：*/
/**     super([arguments]); 访问并返回父类的prototype对象；*/
/**     super.funcName([arguments]);   访问并返回具体方法*/
"use strict";
//实现一个Array的改造
class MyArray extends Array{
    constructor(){
        super(); //把this绑定到父对象
        console.log(new.target);
        this.history = [[]];
    }
    commit(){
        this.history.push(this.slice());
    }
    revert(){
        this.splice(0,this.length,...this.history[this.history.length - 1]);
    }

}
let foo = new MyArray();
foo.push(1);
foo.push(2);
foo.push(3);
foo.push(4);
foo.commit();
console.log(foo,foo.history);
foo.revert();
console.log(foo,foo.history);
