# 1. react实例的生命周期
- 1. 生命周期是什么？
  - &: 生命周期，就是一个实例从初始化，到更新，再到销毁的一个过程

- 2. react实力生命周期的三个阶段
  - &:
    - 初始化阶段：
    - 更新阶段：setState函数，促使组件重新渲染
    - 销毁阶段：
- 3. 三个阶段对应的构造函数有：
  - &:
    - 初始化阶段
      - constructor
      - componentWillMount
      - render
      - componentDidMount
    - 更新阶段
      - shouldComponentUpdate
      - componentWillUpdate
      - componentWillReceiveProps(nextProps)  
      - render
      - componentDidUpdate
    - 销毁阶段
      - componentWillUnmount

# 2. 虚拟DOM，为什么会提高性能
- 1. 什么是虚拟dom

- 2. 为什么会提高性能，他和真实dom的区别

# 3. react的diff原理
- 1. 传统diff算法
  - &: 需要遍历整棵树的节点，深度递归，运算复杂度是 O(n^3)
- 2. react的优化
  - &: 1. DOM 跨层级不优化; 2. 组件隔离; 3. 同级标识，不用再查找

# 4. state和props的区别
- &:
  - 1. state是组件的状态，内部数据
  - 2. props是组件的属性，外部传值的接口对象

# 5. setState
- 1. 如何更新组件，或者初始组件重新渲染
  - &: 使用setState
- 2. 调用setState之后，会有哪些流程被触发
  - &: 1. 合并state; 2. 重新渲染组件; 

# 6. props传入的数据，组件内部可以修改吗？修改之后，外部组件的数据会跟着改变吗？

# 7. super
- 1. 类组件中调用super的作用是什么？

# 8. react的class组件和function组件的区别

# 9. 受控组件
- 1. 什么是受控组件

- 2. 什么是非受控组件

# 10. 高阶组件
- 1. 什么是高阶组件

- 2. 在什么情况下使用

- 3。 vue有没有相同的用法

# 11. 一个react模块，你的开发流程是怎么样的，就比如：一个页面任务（审批页|列表页）到你手上了，你一开始怎么做？
如果“不同权限可观看到不同元素”，你要怎么做

# 12. 组件间传递数据的做法

# 13. 怎么做权限管理的

# 14. 一个审批流程，有3-5个审批节点，但是不同的人能看到不同的节点
如果不同的人看到不同的字段
