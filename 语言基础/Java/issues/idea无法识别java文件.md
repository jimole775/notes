- **背景**:
在idea中通过new project操作，新建了一个 maven 项目，初始化完成后，发觉编译错误，java文件未被正确识别，输入代码也没有提示

- **原因**:
具体布清楚是哪个一个步骤导致的

- **解决**:
通过 setting 设置，在 *setting > Editor > file Type* 中，找到 java 类型，填家类型识别正则 `*.java`