- `File direction = new File("");` # 用于获取当前模块的系统信息

- `File file = new File(direction.getAbsolutePath() + File.separator + "errs.log");` # 读取目标文档  

- `FileInputStream st = new FileInputStream(file);` # 把文件内容导入流

- `byte[] b = new byte[1024];` # 创建byte数组用于存储文件读出来的缓存字节

- `st.read(b);` # 把缓存数据读出，填充进byte数组

- `st.close();` # 流操作结束，必须关闭接口

- `System.out.println(new String(b));` # 打印一下

- `String static.separator` // 获取当前系统的目录分隔符

- `String [FileInstance].getAbsolutePath();` // 获取当前模块的绝对目录

- `boolean [FileInstance].isFile();` //

- `FILE[] [FileInstance].listFiles;`
