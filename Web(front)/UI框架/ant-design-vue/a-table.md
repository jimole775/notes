# 嵌套表格

# 嵌套组件
<template>
    <a-table :dataSource="dataSource" :columns="columns" >
        <template slot="age" slot-scope="text, record, index">
            <a>{{ text + record.age + index}}</a> <!--text:单元格文本, record: 行数据, index: 行下标-->
        </template>
    </a-table>
</template>
<script>
export default {
    data(){
        return {
            columns: [
                {
                    title: '年龄',
                    dataIndex: 'age',
                    scopedSlots: { customRender: 'age' } // 关键步骤
                }
            ]
        }
    }
}
</script>
# customRow用法

``` html
<template>
    <a-table :customRow="customRow">
    
    </a-table>
</template>
<script>
export default {
    data(){
        return {
            customRow(record, index) {
                return {
                    props: {
                        // xxx...
                    },
                    on: {
                        click: (event) => {},       // click row
                        doubleclick: (event) => {}, // double click row
                        contextmenu: (event) => {},  // right button click row
                        mouseenter: (event) => {},   // mouse enter row
                        mouseleave: (event) => {},   // mouse leave row
                    },
                    }
                )},
            customHeaderRow(column) {
                return {
                    on: {
                        click: () => {},        // click header row
                    },
                }
            }
        }
    }
}
</script>
```
# 多层表头

# 折叠表格
``` html
<template>
    <a-table :dataSource="dataSource" :columns="columns" >
    
    </a-table>
</template>
<script>
export default {
    data(){
        return {
            dataSource: [
                {
                    key: '',
                    title: '',
                    children: [{
                        key: '',
                        title: '',
                        children: []
                    }]
                }
            ]
        }
    }
}
</script>
```


