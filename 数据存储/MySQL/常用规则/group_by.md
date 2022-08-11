# group by 语句

1. group by是将具有相同的进行分组，化成一块数据集合，之后配合聚合函数进行数据处理。比如：全校学生成绩表(学号，姓名，班级，成绩….)，现在我需要将按照相同的班级进行分类，之后计算出每个班的最高的成绩。

- 创建好student_score表
``` sql
SID SNAME CLASS total_score
```

- 按照班级进行分类：以班级分类为主
按照班级分类：计算出每个班的最高的成绩。

``` sql
select CLASS, SNAME from student_score group by CLASS, SNAME;
select CLASS, MAX(TOTAL_SCORES) AS TOP from student_score group by CLASS;
```

2. group by需要注意的几点

- `group by` 语句通常配合聚合函数 `SUM、MAX、MIN` 等使用处理数据。

- `group by` 语句中使用的聚合函数处理数据是 `group by` 分组完毕之后聚合函数是对分组数据进行处理的，不是对整个表。
  比如group by之后一班的成绩有250、251、253、254。`聚合函数MAX()` 是针对一班这四个数据计算的。并不是MAX()整个表。

- **select后面的查询字段要包含在group by后面的字段中**。
