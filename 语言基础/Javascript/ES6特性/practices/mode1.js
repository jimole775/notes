
var A = function(){
    
    // setTimeout(function(){
    //     console.log("fn scope:",taht);
    // });

    // setTimeout(()=>{
    //     console.log("arrow scope:",this);
    // });

    function BB(){   
        console.log("inner scope:",this);
        setTimeout(function(){
            console.log("inner fn scope:",this);
        });

        setTimeout(()=>{
            console.log("inner arrow scope:",this);
        });
    }

    BB();

    // console.log("my prototype is:",this);
}
A();

// console.log("what is b:",b);
// console.log("what is a:",a);