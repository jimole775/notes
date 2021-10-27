首先可以断定一点，格林高利日历的封装方法会比Date多，
而且Date偏向于处理时间，而GregorianCalendar则偏向于处理日历

有一个常量 Calendar 可以配合对象实例进行具体时间节点的获取
``` java
Calendar.DAY_OF_WEEK
Calendar.DAY_OF_MONTH
Calendar.MONTH
Calendar.YEAR

Calendar.JANURAY ~ DECEMBER //通过这个常量访问，可以得到准确的月份
```

``` java
GregorianCalendar today = new GregorianCalendar();
System.out.println(today.get(Calendar.YEAR));
```

实例方法getTime会返回具体的年月日和时分秒，和Date返回的毫秒有区别
