package com.packsomething;
import java.util.*;
public class DoMain{
    public static void main(String[] arg){

        doParam(1,23,4);

    }

    static void doParam(Integer... its){   
        // Throwable excep = new Throwable("try exception!");
        assert its[0] >= 1 : "is not right params"; 
        System.out.println("good run");
    }
}

class ObjectAnalyzer{
    public String toString(Object obj){
        String res = "[";
        do{

        }
        while (false);

        return res;
    }
}



