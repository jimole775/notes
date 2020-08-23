# 引入
```
import ReactEcharts from 'echarts-for-react'
```
# 获取js实例
``` js
  constructor () {
    this.echartsReact = null
    this.option = {}
  }
  componentDidUpdate () {
    this.echartsReact.getEchartsInstance().setOption(this.option)
  }
  render () {
    return <ReactEcharts
      option={this.option}
      // 获取ReactEcharts的引用
      ref={(e) => { this.echartsReact = e }} 
    ></ReactEcharts>
  }
```