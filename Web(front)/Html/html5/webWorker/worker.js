/**
 * Created by Andy on 2017/8/20.
 */
var i = 10;
while(i>0){
    postMessage(i);
    i--;
}
onmessage = function(event){
    console.log(event.data);
};