package com.packsomething;
import java.util.*;
import java.util.logging.*;

public class DoMain{
    public static void main(String[] arg){

        doParam(1,23,4);

    }

    static void doParam(Integer... its){   
        Logger log = Logger.getLogger("com.packsomething.DoMain");
        log.info("aaa");
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



