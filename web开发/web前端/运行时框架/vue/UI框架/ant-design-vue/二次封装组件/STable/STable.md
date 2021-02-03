### 概述
相当于单页组件，整合常用的表单页面
- 整合模块包括：

1. 查询头（根据配置动态渲染）

2. 分页（不用再重复写分页逻辑）

3. 集成审批操作（导出，批量操作：放弃，驳回，通过，撤回，关闭）

4. 树型表单（通过 "expand-api" 属性开启）

### 样例
``` vue
<template>
  <STable
    :columns="columns"
    :searchor="searchor" // 查询组件
    :row-key="'id'" // 行标记
    :data-dict="'xxx'" // 由于接口不一定都统一，需要在必要时，加一个dataDict路径，帮助获取接口数据
    :data-api="'apiNameOrFunction'" // 绑定表格数据接口
    :expand-api="'apiNameOrFunction'" // 绑定表格数据接口
    :export-api="'apiNameOrFunction'" // 绑定【导出】接口，并开启对应功能按钮，如果为空值就不显示按钮
    :abandon-api="'apiNameOrFunction'" // 绑定批量【放弃】接口，并开启对应功能按钮，如果为空值就不显示按钮
    :reject-api="'apiNameOrFunction'" // 绑定批量【驳回】接口，并开启对应功能按钮，如果为空值就不显示按钮
    :pass-api="'apiNameOrFunction'" // 绑定批量【通过】接口，并开启对应功能按钮，如果为空值就不显示按钮
    :revoke-api="'apiNameOrFunction'" // 绑定批量【撤回】接口，并开启对应功能按钮，如果为空值就不显示按钮
    :close-api="'apiNameOrFunction'" // 绑定批量【关闭】接口，并开启对应功能按钮，如果为空值就不显示按钮
    :is-pagination="true"
    @update="updateDataSet"
  >
    <!-- 表格头部的摘要插槽 -->
    <template slot="summary">
    </template>
    <!-- 和原生插槽的区别：slot-scope只注入record -->
    <template slot="prNo" slot-scope="record">
      {{ record.prNo }}
    </template>
  </STable>
</template>
<script>
import STable from '@/components/STable'
const columns = [
  {
    title: '项目PR',
    dataIndex: 'prNo',
    scopedSlots: { customRender: 'prNo' } // scopedSlots 这个属性定义之后，必须要使用，否则视图只显示空白
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    customRender (text, record, index) {
      return text
    }
  }
]

// 查询头组件
const searchor = [
  {
    title: 'ant组件',
    key: 'key',
    component: 'AInput' // 普通Input类型的查询框
  },
  {
    title: '角色组件',
    keys: ['key1', 'key2'], // 查询需要的字段，和 optionKeys 一一对应
    optionKeys: ['key', 'label'], // 选项的取值字段
    component: 'UserSelect'
  },
  {
    title: '字典组件',
    props: {
      'group-code': 'project_type', // DictSelect 的字典名
      'value-field': 'itemCode', // DictSelect 需要 valueField 去对应获取 选项的取值字段
    },
    key: 'key',
    component: 'DictSelect'
  },
  {
    title: '被依赖组件',
    key: 'key',
    component: 'CitySelect'
  },
  {
    title: '依赖组件',
    dependKey: 'cityName', // 依赖【城市】的值，【工作地点】才获取下拉选项
    key: 'key',
    component: 'WorkplaceSelect'
  },
  {
    title: '周期组件', 
    keys: ['applyStartDate', 'applyEndDate'], // 选择时间范围
    component: 'RangePicker'
  }
]
export default {
  components: {
    STable
  },
  data () {
    return {
      columns,
      searchor: searchor
    }
  }
}
</script>
```