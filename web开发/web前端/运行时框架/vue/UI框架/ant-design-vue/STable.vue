<template>
  <div class="br-shadow-block">
    <div class="panel-content border-bottom-1 br-top-6px">
      <a-form class="form-wrap">
        <a-row>
          <slot name="searchor" />
          <template v-for="(searchItem, index) in searchor">
            <a-col
              :span="6"
              :key="index"
            >
              <a-form-item :label="searchItem.title" :label-col="{span: 8}" :wrapper-col="{span: 16}">
                <YearPicker
                  v-if="searchItem.component === 'YearPicker'"
                  v-model="queryObj[searchItem.key]"
                />
                <a-input
                  v-if="searchItem.component === 'Input'"
                  :default-value="searchItem.value"
                  v-model="queryObj[searchItem.key]"
                />
                <a-select
                  v-if="searchItem.component === 'Select'"
                  :default-value="searchItem.value"
                  v-model="queryObj[searchItem.key]"
                />
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" class="t-center mt5">
            <a-button ghost type="primary" @click="search">查询</a-button>
            <a-button html-type="reset" :style="{ marginLeft: '8px' }" @click="resetSearch">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="panel-content br-bottom-6px">
      <div class="btn-wrap clearfix">
        <slot name="summary" />
        <a-upload
          v-if="this.importApi"
          name="file"
          accept=".xls, .xlsx"
          :before-upload="beforeUpload"
          :file-list="fileList"
          class="import-table"
        >
          <a-tooltip>
            <template slot="title">导入</template>
            <a-button
              class="cir-button button-import"
            />
          </a-tooltip>
        </a-upload>
        <a-tooltip v-if="this.exportApi">
          <template slot="title">导出</template>
          <a-button
            @click="exportOut"
            class="cir-button button-export"
          />
        </a-tooltip>
        <a-tooltip v-if="this.templateApi">
          <template slot="title">导入模板下载</template>
          <a-button
            @click="downLoadTemplate"
            class="cir-button button-import-template-down"
          />
        </a-tooltip>
      </div>
      <a-table
        bordered
        :columns="columns"
        :data-source="dataList"
        :pagination="isPagination ? pagination : false"
        :scroll="{ x: 2000 }"
        :row-key="record => record.id"
        :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="onChangePage"
      >
        <template v-for="columnSlot in columnSlots" :slot="columnSlot.scopedSlots?columnSlot.scopedSlots.customRender:''" slot-scope="text,record">
          <slot :name="columnSlot.scopedSlots?columnSlot.scopedSlots.customRender:''" v-bind="record" />
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import moment from 'moment'
import api from '@/api'
export default {
  props: {
    columns: {
      type: Array,
      default: null
    },
    searchor: {
      type: Array,
      default: null
    },
    dataApi: {
      type: String,
      default: null
    },
    exportApi: {
      type: String,
      default: null
    },
    importApi: {
      type: String,
      default: null
    },
    templateApi: {
      type: String,
      default: null
    },
    isPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      queryObj: {},
      dataList: [],
      fileList: [],
      selectedRowKeys: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: ['5', '10', '15', '20', '30']
      },
      areaData: ''
    }
  },
  watch: {
    searchor: {
      handler (val = []) {
        val.forEach((searchItem) => {
          console.log(searchItem)
          this.$set(this.queryObj, searchItem.key, searchItem.value)
        })
      },
      immediate: true
    }
  },
  computed: {
    columnSlots () {
      // 把树形的cloumns拆成平面，只支持两层
      const newCols = []
      this.columns.forEach(col => {
        if (col.children && col.children.length) {
          col.children.forEach(_col => {
            if (_col.scopedSlots) {
              newCols.push(_col)
            }
          })
        } else {
          if (col.scopedSlots) {
            newCols.push(col)
          }
        }
      })
      return newCols
    }
  },
  filters: {
    formateData (date) {
      if (utils.strToDate(date) !== 'Invalid date') {
        return utils.strToDate(date)
      } else {
        return date
      }
    },
    formateDay (date) {
      if (utils.strToMonth(date) !== 'Invalid date') {
        return utils.strToMonth(date)
      } else {
        return date
      }
    },
    formateEvalute (record) {
      let account, name
      if (record.evaluateAccount) {
        account = record.evaluateAccount
      } else {
        account = ''
      }
      if (record.evaluateName) {
        name = record.evaluateName
      } else {
        name = ''
      }
      return account + ' ' + name
    }
  },
  created () {
    let parm = {
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.current
    }
    this.loadList({ ...parm, ...this.queryObj })
  },
  methods: {
    moment,
    update () {
      this.$emit('update', this.dataList)
    },
    // table全选功能
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 重置
    resetSearch () {
      this.queryObj = {}
      this.pagination.current = 1
      this.loadList({ pageSize: this.pagination.pageSize, pageNum: this.pagination.current })
    },
    // 导入
    async beforeUpload (file) {
      const pass = utils.verifyUploadType(file.name, this.supportSeries)
      if (!pass) return false
      const params = new FormData()
      params.append('file', file)
      const res = api[this.importApi] && await api[this.importApi](params)
      if (res.code === 200) {
        this.$message.success('导入成功')
        let parm = {
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.current
        }
        this.loadList(parm)
      } else {
        this.$modal.warning({
          title: '提示',
          okText: '确定',
          content: res.message
        })
      }
      return false
    },
    // 点击查询
    search () {
      this.pagination.current = 1
      let parm = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current
      }
      console.log(this.queryObj)
      this.loadList({ ...parm, ...this.queryObj })
    },
    // 导出
    exportOut () {
      if (this.dataList.length === 0) {
        this.$modal.warning({
          title: '提示',
          okText: '确定',
          content: '暂无数据导出!'
        })
        return false
      }
      // eslint-disable-next-line no-unused-vars
      let ids = ''
      if (this.selectedRows && this.selectedRows.length > 0) {
        this.selectedRows.filter(item => {
          ids += item.id + ','
        })
        ids = ids.substring(0, ids.length - 1)
      }
      api[this.exportApi] && api[this.exportApi]({ ids: ids, ...this.queryObj })
    },
    // 导入模板下载
    downLoadTemplate () {
      api.exportFile(this.templateApi)
    },
    // 获取列表数据
    async loadList (parm) {
      this.selectedRows = []
      this.selectedRowKeys = []
      const res = api[this.dataApi] && await api[this.dataApi](parm)
      console.log('loadList：', res)
      if (res.code === 200) {
        if (res.data) {
          this.dataList = res.data
          this.pagination.total = res.data.total || 0
        } else {
          this.dataList = []
          this.pagination.total = 0
        }
        this.update()
      } else {
        this.$modal.warning({
          title: '提示',
          okText: '确定',
          content: res.message
        })
      }
    },
    // 服务费用分页
    onChangePage (val) {
      this.pagination.current = val.current
      this.pagination.pageSize = val.pageSize
      let parm = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current
      }
      this.loadList({ ...parm, ...this.queryObj })
    }
  }
}
</script>
<style lang="less" scoped>
.inputStyle {
  margin-left: 6%;
}
.fromStyle {
  padding: 30px 15px;
}
.btnstyle {
  padding: 10px 15px;
  height: 50px;
  line-height: 2;
  button {
    margin-right: 15px;
  }
}
.btnstyle2 {
  padding: 10px 0px;
  button {
    margin-right: 15px;
  }
}
.alink {
  color: #05b570;
}
.mar15 {
  margin-right: 15px;
}
.detailBox {
  padding-top: 0px;
}
.p22 {
  padding-top: 22px;
}
.pf15 {
  padding-right: 20px;
}
.mainconfim {
  text-align: center;
  padding-top: 15px;
}
.tootipword {
  margin-bottom: 0px;
}
.leadertext {
  float: left;
  color: #868c97;
}
.ant-table-wrapper {
  padding: 0 1rem 1rem 1rem;
}
</style>
