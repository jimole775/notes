package com.packsomething;
import java.util.*;
public class DoMain{
    public static void main(String[] arg){

        doParam(1,23,4);

    }

    static void doParam(Integer... its){   
        ActionListener listener = new MyTimer();
        Timer t = new Timer(1000,listener);
        System.out.println(t.start());
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

class MyTimer implements ActionListener{
    public void actionPerformed(ActionEvent event){
        Date now = new Date();
        System.out.println(now);
    }
}


