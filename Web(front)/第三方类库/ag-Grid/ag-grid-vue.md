# 安装
``` bash
npm install --save-dev ag-grid-community vue-property-decorator ag-grid-vue
```

# 样例
``` html
<template>
  <div>
    <!-- columnDefs表头  rowData表格数据-->
    <!-- ag-theme-balham 是ag-grid自带的表格样式类 -->
    <ag-grid-vue :column-defs="columnDefs" :row-data="rowData" class="table ag-theme-balham" />
  </div>
</template>
 
<script>
// 引入ag-grid-vue
import { AgGridVue } from 'ag-grid-vue'
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css"
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css"
export default {
  components: { AgGridVue },
  data () {
    return {
      columnDefs: [
        {headerName: '姓名', field: 'name'},
        {headerName: '性别', field: 'gender'},
        {headerName: '年龄', field: 'age'}
      ],
      rowData: [
        {name: '李煜', gender: '男', age: 20},
        {name: '柳叶', gender: '女', age: 25},
        {name: '姜宇', gender: '男', age: 18}
      ]
    };
  }
};
</script>
 
<style scoped>
.table{
  width: 600px;
  height: 200px;
}
</style>
```
