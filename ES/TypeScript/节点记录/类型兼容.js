/**
 * Created by Andy on 2017/8/28.
 */
var bar = { name: "andy", age: 10 };
var foo;
foo = bar; //��ֵ�����󣬲��ᱨ��
console.log(foo.name);
function getter(arg) {
    return arg.name;
}
getter(bar); //��ֵ�����󣬲��ᱨ��
//# sourceMappingURL=类型兼容.js.map