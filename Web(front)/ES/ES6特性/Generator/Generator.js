/**
 * Created by Andy on 2017/7/3.
 */
function getFoo(){
    return new Promise(function(resolve,reject){
        resolve('foo');
    })
}

var g = function* (){
    var foo = yield getFoo();
    console.log(foo);
}

function run(generator){
    var it = generator();
    function go(result){
        if(result.done)return result.value;

        return result.value.then(function(value){
            return go(it.next(value));
        },function(err){
            return go(it.throw(err));
        })
    }
    go(it.next());
}

run(g);