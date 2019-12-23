/**
 * Created by Andy on 2017/8/26.
 */
/**锟斤拷锟斤拷锟斤拷锟酵凤拷锟酵接口差不锟斤拷*/
var GenericNumber = (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
/**锟斤拷锟斤拷约锟斤拷*/
//锟斤拷始锟斤拷锟斤拷默锟较诧拷锟斤拷锟斤拷锟轿何凤拷锟斤拷锟斤拷锟斤拷锟皆ｏ拷锟斤拷锟斤拷锟节憋拷锟斤拷锟斤拷时锟斤拷锟斤拷锟斤拷示锟斤拷锟斤拷
function loggingIdentity(arg) {
    //console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
function loggingIdentity1(arg) {
    console.log(arg.length); // access
    return arg;
}
//# sourceMappingURL=娉涘瀷.js.map