/**
 * Created by Andy on 2017/9/2.
 */
    "use strict";
class Animal{
    constructor(){

    }
    get foo(){
        console.log("getting right!");
    }

    set bar(str){
        console.log("setting right!" + str);
    }
    static set prop(str){
        console.log("setting right!" + str);
    }
}

var cat = new Animal();
cat.bar = "doo";
Animal.prop = "wild";
