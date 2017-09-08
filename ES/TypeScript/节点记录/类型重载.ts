/**
 * Created by Andy on 2017/8/28.
 */
interface Test{
    (x:string,y:number):string;
    (x:boolean):string;
}

let test:Test = function():string{
    console.log(arguments);
    return "hello";
};

test("works",9);

test(true);
