package com.packsomething;
import java.util.*;
import java.util.logging.*;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.File;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.io.ObjectInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;
import java.util.zip.ZipInputStream;


public class DoMain{
    public static void main(String[] arg){

        doParam(1,23,4);

    }

    static void doParam(int... its){   
        try{

            
            File direction = new File("");
            String filePath = direction.getAbsolutePath() + File.separator + "readLineTest.txt";   

            
            // ObjectAnalyzer obj = new ObjectAnalyzer();
            // ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));
            // oos.writeObject(obj);
            // oos.close();   

            // ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath));
            // ObjectAnalyzer staff = (ObjectAnalyzer)ois.readObject();     
            // ois.close();
            
            

            System.out.println(staff.name);  
       

        }catch(Exception e){
            e.printStackTrace();
        }
    }
}

class ObjectAnalyzer implements Serializable{
    public String toString(Object obj){
        return "none";
    }
    public String name = "Andy";
    public int age = 31;
}



