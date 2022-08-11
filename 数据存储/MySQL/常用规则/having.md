# having：
- 特性
1. 是作用在查询结果分组之后，筛选满足条件的组，过滤掉数据。

2. 通常跟聚合函数一起使用。

3. having子句在聚合后对组记录进行筛选。

4. 只作用于分组

- 样例
1. 计算出每个班级的总成绩
``` sql
SELECT CLASS,SUM(TOTAL_SCORES) FROM student_score GROUP BY CLASS;
```

2. 筛选出总成绩大于505的班级
``` sql
SELECT CLASS,SUM(TOTAL_SCORES) FROM student_score GROUP BY CLASS HAVING SUM(TOTAL_SCORES)>505;
```

- 使用 `having` 与 `where` 联立的例子

实例：查询班级中分数大于250的学生的总成绩大于531的班级有哪几个班。

执行顺序为：

> 开始 -> where行记录筛选 -> group by分组 -> 聚合函数(sum、max、min)计算 -> having分组筛选->结束

``` sql
-- 1.WHERE筛选出分数大于250的学生
SELECT CLASS,SNAME,TOTAL_SCORES FROM student_score WHERE TOTAL_SCORES>250;

-- 4.SUM计算之后，having筛选总成绩大于531的分组
SELECT CLASS,SUM(TOTAL_SCORES) AS SUM_SCORE FROM student_score 
WHERE TOTAL_SCORES>250 
GROUP BY CLASS HAVING SUM(TOTAL_SCORES)>531;
```