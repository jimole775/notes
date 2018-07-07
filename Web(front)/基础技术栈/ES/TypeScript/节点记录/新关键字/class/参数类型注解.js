function greeter(person) {
    return "Hello " + person;
}
var user1 = "Andy";
console.log(greeter(user1));
function greeter2(person) {
    return "Hello " + person.firstName + "." + person.lastName;
}
var user2 = { firstName: "Andy", lastName: "Rong" };
//console.log(greeter2(user2));   //锟斤拷锟斤拷user2锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷证锟斤拷js锟斤拷锟斤拷一锟斤拷锟街诧拷锟斤拷顺锟斤拷执锟叫的ｏ拷class锟斤拷锟轿凤拷锟斤拷锟斤拷锟斤拷前锟斤拷锟斤拷
var Person = (function () {
    function Person(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + middleInitial + lastName;
    }
    return Person;
}());
var user3 = new Person("John", "Snow", "Rong");
console.log(greeter2(user3));
//锟斤拷锟斤拷锟杰斤拷一锟铰癸拷锟斤拷锟斤拷锟斤拷注锟斤拷锟斤拷锟斤拷锟斤拷支锟斤拷锟斤拷锟酵ｏ拷
//锟街憋拷锟叫ｏ拷 string, number, boolean, [class|object], Array<number|string|class|object> 
//# sourceMappingURL=鍙傛暟绫诲瀷娉ㄨВ.js.map