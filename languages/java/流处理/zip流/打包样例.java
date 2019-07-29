import java.util.zip.ZipEntry; // 用于创建zip包的条目
import java.util.zip.ZipOutputStream;  //用于把数据写到zip包的条目
import java.io.File; //用于创建当前目录的描述实例


public class ZipCompress{
      public static void main(String[] arg){
            File direction = new File(""); //获取当前文件的描述

            // 生产一些数据
            StringBuilder strs = new StringBuilder("im ");
            strs = strs.append("write ");
            strs = strs.append("down ");
            strs = strs.append("here ");
            strs = strs.append("!\n");
            byte[] b = strs.toString().getBytes("GBK");
            
            /**打包的流程：
             * 1，使用 new FileOutputStream(name.zip)   新建一个空的zip类型文件，并接入I/O接口
             * 2，使用 new ZipOutputStream(zipOS)       把普通文件流包装成zip类型
             * 3，使用 new ZipEntry(fileName)           创建一条zip条目，filename随意
             * 3，使用 putNextEntry(zipentry)           把 zip条目 对接到 zip流
             * 4，使用 write(data)                      把数据写到zip流中
             * 5，使用 closeEntry()                     闭合当前条目，一个条目写完
             * 6，使用 putNextEntry(zipentry)           对接另一个条目
             * 7，循环 ...
             * 8，最后 close()                          关闭I/O，打包完成
            */
            FileOutputStream fileOS = new FileOutputStream(direction.getAbsolutePath() + File.separator + "errs.zip");
            ZipOutputStream zos = new ZipOutputStream(fileOS); // 把文件流转换成zip流
            ZipEntry ze = new ZipEntry("log.txt"); // 创建一个zip条目，可以随便取个名字
            ZipEntry ze1 = new ZipEntry("log.txt"); // 创建一个zip条目，可以随便取个名字

            zos.putNextEntry(ze); // zip条目和zip流对接
            zos.write(b,0,b.length); // 写数据
            zos.closeEntry();   // 关闭zip当前书写的条目
            
            zos.putNextEntry(ze1); // zip条目和zip流对接
            zos.write(b,0,b.length); // 写数据
            zos.closeEntry();   // 关闭zip当前书写的条目

            zos.close(); //关闭I/O
        }
    }