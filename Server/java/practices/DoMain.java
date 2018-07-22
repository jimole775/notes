package com.packsomething;
import java.util.*;
import java.util.logging.*;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.File;

public class DoMain{
    public static void main(String[] arg){

        doParam(1,23,4);

    }

    static void doParam(Integer... its){   
        try{
        Logger log = Logger.getLogger("com.packsomething.DoMain");
        File direction = new File("");
        File file = new File(direction.getAbsolutePath() + File.separator + "errs.log");
        FileInputStream st = new FileInputStream(file);
        byte[] b = new byte[1024];
        st.read(b);
        st.close();
        log.info(new String(b));
    }catch(Exception e){}
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



