function greeter(person) {
    return "Hello " + person;
}
var user1 = "Andy";
console.log(greeter(user1));
function greeter2(person) {
    return "Hello " + person.firstName + "." + person.lastName;
}
var user2 = { firstName: "Andy", lastName: "Rong" };
//console.log(greeter2(user2));   //����user2����������֤��js����һ���ֲ���˳��ִ�еģ�class���η�������ǰ����
var Person = (function () {
    function Person(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + middleInitial + lastName;
    }
    return Person;
})();
var user3 = new Person("John", "Snow", "Rong");
console.log(greeter2(user3));
//�����ܽ�һ�¹�������ע��������֧�����ͣ�
//�ֱ��У� string, number, boolean, [class|object], Array<number|string|class|object> 
//# sourceMappingURL=参数类型注解.js.map