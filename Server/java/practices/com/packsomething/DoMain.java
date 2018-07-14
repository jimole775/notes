package com.packsomething;
import java.util.*;
public class DoMain{
    public static void main(String[] arg){

        doParam(1,23,4);

    }

    static void doParam(Integer... its){   
     String[] a = {"sd","d","w"};
     Class b = a.getClass();
        System.out.println(b.isArray());
    }
}

enum LevelsType{
    LEVEL1,
    LEVEL2,
    LEVEL3,
    LEVEL4
 };

enum CarEnum {
 
    BMW("BMW"), TOYOTA("TOYOTA"), FIAT("FIAT");
    private String CarType;

    private CarEnum(String CarType) {
    this.CarType = CarType;
    }

    public String getCarType() {
    return CarType;
    }
 }
 
 
class EnumTest {
    static CarEnum mycar;
    public EnumTest()
    {
        System.out.println(mycar.BMW.getCarType());
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



