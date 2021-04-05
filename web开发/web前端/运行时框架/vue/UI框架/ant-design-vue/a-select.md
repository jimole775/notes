由于select涉及到'展示','取值','搜索'这几项互相关联，又仅通过一个输入框实现的功能，也就是说多个入口多个出口的问题，牵扯到的逻辑是比较麻烦的，所以需要在这里记录一下，a-select已经为用户设计好的api，以实现快速建设：
1. :filterOption: 一般在输入框中输入字符，只能匹配到选项列表中的val值，多数情况下业务都需要输入text值来进行选项筛选，使用这个API就可以做到
2. :labelInValue: 一般情况下，选中之后，推送的都是val值，有时候业务中，需要选中的时候推送text值，所以可以使用这个API可以把val和text都推送出来
3. :showSearch: 是否支持输入搜索
4. @search: 搜索功能事件，入参是搜索框的输入值，v-model只获取被选中的option的value

### 经常遇到的问题，就是输入框只显示model的值
这种情况就是 `deptDataOptions` 没有匹配到 item.value 的数据

``` html
    <a-select
      show-search
      v-model="model" /*model永远只指向item.value*/
      @search="(keyword) => { console.log(keyword) /*keyword是用户输入的值*/ }"
      @change="change"
    >
      <a-select-option v-for="item in deptDataOptions" :key="item.key" :value="item.value">{{ item.text/*这里才是选中后显示的内容*/ }}</a-select-option>
    </a-select>
```
