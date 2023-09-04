## 几个常用api：
1. `:filterOption`: 给与逻辑来判断是否显示下拉项
2. `:labelInValue`: 需要把选项封装成 {key: value}的形式
3. `:showSearch`: 是否支持输入搜索
4. `@search`: 搜索功能事件，入参是搜索框的输入值，v-model只获取被选中的option的value

``` html
    <a-select
      v-model="model"
      :showSearch="true"
      :labelInValue="true"
      :filterOption="(val, option) => {}"
      @change="(val) => { console.log(val) }"
      @search="(keyword) => { console.log(keyword) }"
    >
      <a-select-option v-for="item in options" :key="item.key" :value="item.value">
        {{ item.value }}
      </a-select-option>
    </a-select>
```
