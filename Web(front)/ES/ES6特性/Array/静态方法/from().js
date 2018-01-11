//...用于把类数组转换成数组；
//...功能相当于ES5的【[].slice.call(aryLike)】;
//...一般这个方法多用于处理dom对象和arguments之类的对象；

//...还可以赋值两个参数，
//...第一个参数是数组或者类数组，
//...第二个参数可以是一段类似map的表达式；
    Array.from([1, 2, 3], (x)=>x * 3);	//[3,6,9]
    Array.from({length: 3}, ()=>"a");	//[a,a,a]
    let obj = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
    };
    Array.from(obj);	//[1,2,3]