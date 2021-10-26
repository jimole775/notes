assert a > 0 : "数值a必须大于零";
assert a != null : "空指针异常";

//断言和exception不同，exception一般都会在编译时被捕获，
而 assert 一般用于断言值域是否正确，这样做可以方便抛出明确的信息
起码比try catch好用许多

- 不过需要注意：
>>> 断言的代码默认是忽略的，所以一般都是在进行单元测试的使用: `java -enableassertions com.demo.Test`