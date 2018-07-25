package com.packsomething;
import java.util.*;
import java.util.logging.*;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.File;
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

            FileOutputStream zipOS = new FileOutputStream(direction.getAbsolutePath() + File.separator + "errs.zip");
            StringBuilder strs = new StringBuilder("im ");
            strs = strs.append("write ");
            strs = strs.append("down ");
            strs = strs.append("here ");
            strs = strs.append("!\n");
            byte[] b = strs.toString().getBytes("GBK");
            
            /**中心思想还是：
             * 1，创建一个空的zip包（文件类型）
             * 2，开启一条目录，然后取个名字（new ZipEntry(fileName)）
             * 3，把zip条目对象对接到zip输出流的指定地址（putNextEntry(ze)）
             * 4，然后持续往 指定地址 写数据
             * 5，关闭输出流，打包完成
            */
            ZipOutputStream zos = new ZipOutputStream(zipOS); //把文件流转换成zip流
            ZipEntry ze = new ZipEntry("err.log");// 创建一个zip条目，可以随便取个名字
            zos.putNextEntry(ze); // 把刚刚创建的zip条目扔进zip输出流
            zos.write(b,0,b.length); // 往I/O接口里面写数据
            zos.closeEntry();   //关闭输出流
            

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



