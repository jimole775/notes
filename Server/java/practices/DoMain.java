package com.packsomething;
import java.util.*;
import java.util.logging.*;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.File;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


public class DoMain{
    public static void main(String[] arg){

        doParam(1,23,4);

    }

    static void doParam(int... its){   
        try{
            Logger log = Logger.getLogger("com.packsomething.DoMain");
            File direction = new File("");
            File file = new File(direction.getAbsolutePath() + File.separator + "errs.log");

            FileOutputStream wt = new FileOutputStream(file.getAbsolutePath());
            StringBuilder strs = new StringBuilder("im ");
            strs = strs.append("write ");
            strs = strs.append("down ");
            strs = strs.append("here ");
            strs = strs.append("!\n");
            byte[] b = strs.toString().getBytes("GBK");
            
            wt.write(b);
            wt.write(b);
            wt.close();
            log.info(new String(b));

            

        }catch(Exception e){

        }
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



