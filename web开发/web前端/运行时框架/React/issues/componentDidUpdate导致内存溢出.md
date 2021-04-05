## Can't perform a React state update on an unmounted component
### 触发原因
componentDidUpdate方法内部使用了异步方法，并在异步方法里面修改了this.state属性，导致无限的触发componentDidUpdate方法，导致内存溢出
### 解决
通过flag进行状态标识，使异步方法不能随意设置this.state，并关注 componentDidUpdate 和 componentWillReceiveProps 的使用区别
### 样例
