## 一、unit中集中基本注解，是必须掌握的。
|名称|说明|
|-|-|
|`@BeforeClass`|表示在类中的任意 `public static void` 方法执行之前执行|
|`@AfterClass`|表示在类中的任意 `public static void` 方法执行之后执行|
|`@Before`|表示在任意使用@Test注解标注的 `public void` 方法执行之前执行|
|`@After`|表示在任意使用@Test注解标注的 `public void` 方法执行之后执行|
|`@Test`|使用该注解标注的 `public void` 方法会表示为一个测试方法|