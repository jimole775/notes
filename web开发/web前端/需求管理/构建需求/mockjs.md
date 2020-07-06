mockjs文档：http://mockjs.com/

样例：
``` js
import Mock from 'mockjs2'
const services = []

// 载入配置项
services.push(require('./services/creatingRule'))

// 循环挂载 MOCK 代理
services.forEach(service => {
  const configs = service.default
  configs.forEach(config => {
    const res = () => {
      const count = Math.round(Math.random() * 10)
      const data = []
      for (let i = 0; i < count; i++) {
        const randomRow = Mock.mock(config.mock)
        randomRow.id = randomRow.index = randomRow.key = i + 1
        data.push(randomRow)
      }
      return data
    }

    // 统一使用 POST 方式挂载代理
    Mock.mock(config.path, 'post', res)
  })
})
```

``` js
export default [
  {
    path: /\/baseRule\/baseRuleList/,
    mock: {
      'status|1': ['待启动', '已启动', '未启动'], // 选数组中的一个
      'membersNum|1-99': 100, // 创建随机1-99数字
      'createdBy': '@name', // 创建随机英文名
      'createdBy': '@cname', // 创建随机中文名
      'createdCareer': '@word(5)', // 创建随机的5个英文单词
      'createdCareer': '@cword(5)', // 创建随机的5个中文单词
    }
  }
]
```
