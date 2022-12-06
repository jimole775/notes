mybatis的工具类

- 获取sql会话，进行增删改查
``` java
SqlSession session = MybatisUtils.getSqlSession();
UserMapper mapper = session.getMapper(UserMapper.class);
User us = new User("andy", 18);
mapper.add(url);
session.commit();
session.close();
```