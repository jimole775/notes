function Promise(callback) {
    var that = this;
    that.value = null;
    var resolve = function (value) {
        return that.value = value;
    };
    var reject = function (err) {

    };
    callback(resolve, reject);

    that.then = function (handler) {
        var walker = setInterval(function () {
            if (that.value) {
                clearInterval(walker);
                that.value = handler(that.value) || that.value;
            }
        }, 15);
        return that;
    };

    return that;
}


var promise = new Promise(function (resolve, reject) {
    var res = null;
    setTimeout(function () {
        res = "hello";
        resolve(res);
    }, 3000);
});

promise
    .then(function (result) {
        console.log(result);
        return "world";
    })
    .then(function (result) {
        console.log(result)
    });
