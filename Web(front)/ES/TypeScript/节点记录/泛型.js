/**
 * Created by Andy on 2017/8/26.
 */
/**�������ͷ��ͽӿڲ��*/
var GenericNumber = (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
/**����Լ��*/
//��ʼ����Ĭ�ϲ������κη��������ԣ������ڱ�����ʱ������ʾ����
function loggingIdentity(arg) {
    //console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
function loggingIdentity1(arg) {
    console.log(arg.length); // access
    return arg;
}
//# sourceMappingURL=泛型.js.map