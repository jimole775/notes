function greeter(person:string){    //字串形式
    return "Hello " + person;
}

var user1 = "Andy";

console.log(greeter(user1));


interface Person {
    firstName:string;
    lastName:string;
}

function greeter2(person:Person){   //对象形式,属于接口类型
    return "Hello " + person.firstName + "." + person.lastName;
}

var user2 = {firstName:"Andy",lastName:"Rong"};

//console.log(greeter2(user2));   //这里user2发生报错，证明js在这一部分不是顺序执行的！class修饰符会有提前量？


class Person{
    fullName:string;
    constructor (public firstName:string, public middleInitial:string, public lastName:string){ //这里的public等同于直接创建了成员变量
        this.fullName = firstName + middleInitial + lastName;
    }
}

var user3 = new Person("John","Snow","Rong");

console.log(greeter2(user3));

//最后总结一下关于类型注解的所有支持类型：
//分别有： string, number, boolean, [class|object], Array<number|string|class|object>