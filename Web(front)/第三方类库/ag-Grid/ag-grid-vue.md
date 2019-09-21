# 安装
``` bash
"ag-grid-community": "^21.2.1",
"ag-grid-vue": "^21.2.1",
"ag-grid-enterprise": "^21.2.1", #企业版，比公开版，多一些类似于【右键菜单】的功能，似乎企业版也没见需要收费，为了安全考虑，建议两个都安装
npm install --save-dev ag-grid-community vue-property-decorator ag-grid-vue
```

# 样例
``` html
<template>
  <div>
    <!-- columnDefs表头  rowData表格数据-->
    <!-- ag-theme-balham 是ag-grid自带的表格样式类 -->
    <ag-grid-vue 
          :column-defs="gridColumns" 
          :grid-options="gridOptions"
          :row-data="gridData"
          class="ag-theme-balham container-ag-table"
          @column-everything-changed="onColumnEvent" #监听任何改动
          />
  </div>
</template>
 
<script>
// 引入ag-grid-vue
import { AgGridVue } from 'ag-grid-vue'
import "ag-grid-enterprise"
// 一般都在main.js载入样式文件，因为 node_modules 目录的位置比较确定
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css"
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css"
export default {
  components: { AgGridVue },
  data () {
    return {
      gridColumns: [
        {
          headerName: '选项框', 
          width: 25, 
          checkboxSelection: true,  // 核心属性
          sortable: false,
          suppressMenu: true, // 隐藏头菜单
          pinned: 'left', // 这一列固定在左边
        },
        {
          headerName: '多层表头',
          children: [
            {headerName: "Mobile", field: "mobile", width: 150},
            {headerName: "Land-line", field: "landline", width: 150},
            {headerName: "Address", field: "address", width: 500}
          ]
        }
        {
         headerName: '嵌套元素1',
         field: 'nesting1',
         width: 120,
         cellRenderer: (params) => { // 嵌套html元素，不支持虚拟DOM渲染
           for (const item of this.fmtcodeTypeArr) {
             if (item.value === params.data.KeyFmtcodeType) {
               return '<span>' + item.label + '</span>';
             }
           }
         },
       },
       {
         headerName: '过滤文本1',
         field: 'filter1',
         width: 130,
         valueGetter(params) {
           return params.data.CanAddUnitid === 0 ? false : true;
         },
         valueFormatter(params) {
           return params.value ? '√' : '';
         },
       },
       {
         headerName: '过滤文本2',
         field: 'filter2',
         width: 80,
         valueFormatter(params) {
           return params.data.RegWay === 1 ? '1' : '2';
         },
       },
       {
         headerName: '内部组件',
         field: 'inner',
         width: 80,
         cellRendererFramework: Vue.extend({ // 嵌套组件
          template:'<span>{{ valueCubed() }}</span>',
          methods: {
            valueCubed() {
              return this.params.value * this.params.value * this.params.value;
            }
          }
         }),
       },
       {
         headerName: '外部组件',
         field: 'outer',
         width: 80,
         cellRendererFramework: require('./TableCellInput'),  // 嵌套外部组件
       },
     ],
     gridOptions: {
        defaultColDef: { // 针对每个单元格的默认设置
          sortable: true,
          resizable: true,
          filter: true,
          suppressMenu: true, // 隐藏表头菜单
        },
        showToolPanel: false,  // 显示工具栏
        suppressLoadingOverlay: true, // 去掉表格加载数据提示
        suppressNoRowsOverlay: true, // 去掉表格无数据提示
        suppressDragLeaveHidesColumns: true, // 防止拖动的时候隐藏表格列
        suppressContextMenu: true, // 阻止表格的右键菜单
        suppressRowClickSelection: true, // 阻止单击行进行选中的操作
        onRowSelected: this.RowSelected, // 行选中回调
        rowSelection: 'single', // 单行 single 多行 multiple
        isExternalFilterPresent: () => this.filterStart, // 是否允许外部筛选
        doesExternalFilterPass: this.IfNodeVisible, // 外部筛选条件
        onFilterChanged() { // 筛选条件改变回调
          this.api.deselectAll()
          that.selectedRow = false
        },
     },
     gridData: [...]
    }
  },
  methods: {
    onColumnEvent(event) {
      // 监听整个表格的变动
    },
  }
}
</script>
 
<style scoped>
.table{
  width: 600px;
  height: 200px;
}
</style>
```
