<template>
  <div>
    <div
      v-if="searchorGroups && searchorGroups.length"
      class="panel-content border-bottom-1"
    >
      <a-form class="form-wrap">
        <a-row>
          <template v-for="(searchItem, index) in searchorGroups">
            <a-col v-if="filterExpandSearchor(index)" :span="searchItem.layout ? searchItem.layout.span : 6" :key="index">
              <a-form-item :label="searchItem.title" :label-col="{ span: searchItem.layout ? searchItem.layout.label : 8 }" :wrapper-col="{span: searchItem.layout ? searchItem.layout.wrapper : 16}">
                <component
                  v-if="searchItem.keys"
                  :is="searchItem.component"
                  :allow-clear="!searchItem.required"
                  :default-value="searchItem.default"
                  :ref="`${searchItem.component}${searchItem.keys[0]}`"
                  :depend="queryObj[searchItem.dependKey]"
                  v-bind="searchItem.props"
                  @change="(value, optionItem) => multiSelectEvent(value, optionItem, searchItem)"
                />
                <component
                  v-if="searchItem.key"
                  :is="searchItem.component"
                  :allow-clear="!searchItem.required"
                  :default-value="searchItem.default"
                  :ref="`${searchItem.component}${searchItem.key}`"
                  :depend="queryObj[searchItem.dependKey]"
                  v-model="queryObj[searchItem.key]"
                  v-bind="searchItem.props"
                  @change="(value, optionItem) => simpleSelectEvent(value, optionItem, searchItem)"
                />
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" class="t-center mt5">
            <a-button ghost type="primary" @click="search">查询</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="resetSearch">重置</a-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a v-if="searchorGroups.length > 4" @click="isSearchorExpand = !isSearchorExpand" style="color:#999;font-size:0.8rem;"> {{ isSearchorExpand ? '收起' : '展开' }}
              <a-icon :class="isSearchorExpand ? 'trans-reverse' : 'trans'" type="double-right" />
            </a>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="panel-content">
      <div class="btn-wrap clearfix">
        <slot name="summary" />
        <a-button
          v-if="abandonApi"
          ghost
          type="primary"
          @click="showmodal('abandon')"
        >
          放弃
        </a-button>
        <a-button
          v-if="rejectApi"
          ghost
          type="primary"
          @click="showmodal('reject')"
        >
          驳回
        </a-button>
        <a-button
          v-if="passApi"
          ghost
          type="primary"
          @click="showmodal('pass')"
        >
          审批
        </a-button>
        <a-button
          v-if="revokeApi"
          ghost
          type="primary"
          @click="showmodal('revoke')"
        >
          撤回
        </a-button>
        <a-button
          v-if="closeApi"
          ghost
          type="primary"
          @click="showmodal('close')"
        >
          关闭
        </a-button>
        <a-upload
          v-if="importApi"
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
        <a-tooltip v-if="exportApi">
          <template slot="title">导出</template>
          <a-button
            @click="exportOut"
            class="cir-button button-export"
          />
        </a-tooltip>
        <a-tooltip v-if="templateApi">
          <template slot="title">导入模板下载</template>
          <a-button
            @click="downLoadTemplate"
            class="cir-button button-import-template-down"
          />
        </a-tooltip>
      </div>
      <a-table
        bordered
        :columns="selfColumns"
        :data-source="dataList"
        :pagination="isPagination ? pagination : false"
        :scroll="autoScroll"
        :row-key="rowKey"
        :row-selection="isSelection ? {type: selectMode, selectedRowKeys: selectedRowKeys, onChange: onSelectChange} : null"
        :expanded-row-keys="expandedRowKeys"
        @expand="expandEvent"
        @change="onChangePage"
      >
        <template slot="index" slot-scope="text, record, index">
          {{ (index + 1) + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template v-for="columnSlot in columnScopedSlots" :slot="columnSlot.scopedSlots?columnSlot.scopedSlots.customRender:''" slot-scope="text, record, index">
          <span v-if="columnSlot.customRender" :key="columnSlot.dataIndex">{{ columnSlot.customRender(text, record, index) }}</span>
          <slot v-else :name="columnSlot.scopedSlots?columnSlot.scopedSlots.customRender:''" v-bind="record" />
        </template>
        <template v-for="columnSlot in columnSlots" :slot="columnSlot.slots?columnSlot.slots.title:''">
          <slot :name="columnSlot.slots?columnSlot.slots.title:''" />
        </template>
      </a-table>
    </div>
    <div>
      <a-modal
        width="60%"
        title="批量操作"
        v-model="modal.show"
        @ok="modalSubmitEvent"
      >
        <a-form :form="modal.form">
          <a-row>
            <a-col>
              <a-form-item :label="modal.info.reasonTitle" :label-col="{span: 3}" :wrapper-col="{span: 18}">
                <a-textarea :rows="4" v-decorator="['approvalContent', { rules: [{ required: true, message: `请填写${modal.info.reasonTitle}` }] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item :label="modal.info.listTitle" :label-col="{span: 3}" :wrapper-col="{span: 18}">
                <a-table
                  bordered
                  :row-key="'id'"
                  :columns="modalColumns"
                  :data-source="selectedRows"
                  :pagination="false"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
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
      default: () => []
    },
    dataApi: { // api名字，STable会以api[this.dataApi]的方式调用
      type: String,
      default: null
    },
    searchor: {
      type: Array, // 查询组件定制模板
      default: () => []
    },
    dataParams: { // 插入查询参数，这个参数会触发fetch
      type: Object,
      default: null
    },
    dataDict: { // 由于数据接口的不统一，使用这个来确定列表数据在接口中的位置
      type: String,
      default: null
    },
    recordStatusField: { // 用来指定每一行数据的状态字段名, 默认'flowNode'
      type: String,
      default: 'flowNode'
    },
    expandApi: { // 如果是树级列表，点击展开的时候，需要单独的expandApi拉取子项的数据
      type: String,
      default: null
    },
    exportApi: { // 导出的接口
      type: String,
      default: null
    },
    importApi: { // 导入的接口
      type: String,
      default: null
    },
    templateApi: { // 下载导入模板的接口
      type: String,
      default: null
    },
    abandonApi: { // 批量放弃
      type: String,
      default: null
    },
    passApi: { // 批量审批
      type: String,
      default: null
    },
    rejectApi: { // 批量驳回
      type: String,
      default: null
    },
    revokeApi: { // 批量撤回
      type: String,
      default: null
    },
    closeApi: { // 批量关闭
      type: String,
      default: null
    },
    fetchImmediate: { // 是否立即查询数据
      type: Boolean,
      default: true
    },
    isPagination: { // 是否使用翻页
      type: Boolean,
      default: true
    },
    isSelection: { // 是否需要勾选框
      type: Boolean,
      default: true
    },
    rowKey: { // 确定每行的key绑定的字段
      type: String,
      default: 'id'
    },
    selectMode: { // 单选还是多选
      type: String,
      default: 'checkbox'
    },
    showRank: { // 显示序号
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      queryObj: {},
      dataList: [],
      fileList: [],
      isLoading: false,
      isSearchorExpand: true,
      searchorGroups: [], // 显示搜索栏
      selectedRows: [],
      selectedRowKeys: [],
      expandedRowKeys: [],
      columnSlots: [],
      columnScopedSlots: [],
      modal: {
        show: false,
        info: {},
        form: this.$form.createForm(this)
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: ['10', '20', '50', '100']
      }
    }
  },
  watch: {
    // 监听dataParams参数，使其能触发fetchData()
    dataParams: {
      handler (val) {
        if (val) {
          this.fetchData()
        }
      },
      immediate: true
    },
    columns: {
      handler (val = []) {
        this.columnSlots = []
        this.columnScopedSlots = []
        this.flattenColumns(val, this.columnSlots, this.columnScopedSlots)
      },
      immediate: true
    }
  },
  computed: {
    modalinfomap () {
      return {
        pass: {
          api: this.passApi,
          columns: [],
          approvalResult: '1',
          listTitle: '通过项目:',
          reasonTitle: '审批说明:',
          opreationTips: '审批成功'
        },
        reject: {
          api: this.rejectApi,
          columns: [],
          approvalResult: '2',
          listTitle: '驳回项目:',
          reasonTitle: '驳回原因:',
          opreationTips: '驳回成功'
        },
        revoke: {
          api: this.revokeApi,
          columns: [],
          approvalResult: '4',
          listTitle: '撤回项目:',
          reasonTitle: '撤回原因:',
          opreationTips: '撤回成功'
        },
        close: {
          api: this.closeApi,
          columns: [],
          approvalResult: '7',
          listTitle: '关闭项目:',
          reasonTitle: '关闭原因:',
          opreationTips: '关闭成功'
        },
        abandon: {
          api: this.abandonApi,
          columns: [],
          approvalResult: '10',
          listTitle: '放弃项目:',
          reasonTitle: '放弃原因:',
          opreationTips: '放弃成功'
        }
      }
    },
    modalColumns () {
      const res = []
      this.selfColumns.forEach((colItem) => {
        if (res.length < 5) {
          res.push(colItem)
        }
      })
      return res
    },
    selfColumns () {
      const copy = JSON.parse(JSON.stringify(this.columns))
      if (this.showRank) {
        copy.unshift({
          title: '序号',
          width: '50',
          dataIndex: 'index',
          align: 'center',
          scopedSlots: { customRender: 'index' }
        })
      }
      return copy
    },
    autoScroll () {
      const scroll = { x: 0 }
      this.countColumnsSize(this.selfColumns, scroll)
      return scroll
    },
    supportSeries () {
      const dicts = this.$store.getters.getDictByGroupCode('upload_file_suffix_while_list')
      const supports = dicts.map((item) => {
        return '.' + item.itemCode
      })
      return this.accept ? this.accept : supports.join(',')
    }
  },
  mounted () {
    this.init()
    this.fetchImmediate && this.fetchData()
  },
  methods: {
    moment,
    countColumnsSize (columns, scrollObj) {
      columns && columns.forEach(col => {
        if (col.width) {
          scrollObj.x += col.width ? Number.parseFloat(col.width) : 100
        }
        if (col.children && col.children.length) {
          this.countColumnsSize(col.children, scrollObj)
        }
      })
    },
    implColumnRender (colItem) {
      if (colItem.customRender) {
        colItem.scopedSlots = { customRender: colItem.dataIndex }
      }
    },
    flattenColumns (columns, columnSlots, columnScopedSlots) {
      columns && columns.forEach(col => {
        this.implColumnRender(col)
        if (col.slots) {
          columnSlots.push(col)
        }
        if (col.scopedSlots) {
          columnScopedSlots.push(col)
        }
        if (col.children && col.children.length) {
          this.flattenColumns(col.children, columnSlots, columnScopedSlots)
        }
      })
    },
    validRowsStatus (selectedRows) {
      let pass = true
      // 验证选中行的状态，如果是结束的，就直接提示不可操作
      selectedRows.forEach((row) => {
        if (row[this.recordStatusField] === 'end') {
          pass = false
        }
      })
      return pass
    },
    showmodal (type) {
      if (this.selectedRows && this.selectedRows.length) {
        const pass = this.validRowsStatus(this.selectedRows)
        if (!pass) {
          return this.$modal.warning({
            title: '提示',
            content: '选项中有已结束的项目，请重新选择！'
          })
        }
        this.modal.form.setFieldsValue({ approvalContent: '' })
        this.modal.info = this.modalinfomap[type]
        this.modal.show = true
      } else {
        this.$modal.warning({
          title: '提示',
          content: '请至少勾选一项！'
        })
      }
    },
    modalSubmitEvent () {
      this.modal.form.validateFields(async (err, values) => {
        if (err) return
        const modalInfo = this.modal.info || {}
        const params = {
          approvalResult: modalInfo.approvalResult,
          instanceIds: this.selectedRowKeys
        }
        if (!modalInfo.api) {
          throw new Error('STable未绑定对应的接口！', modalInfo)
        }
        const res = await this.getApiFunction(modalInfo.api)({
          ...values,
          ...params
        })
        if (res.code === 200) {
          this.$message.success(modalInfo.opreationTips)
          this.reload()
          this.$emit('update')
        } else {
          this.$modal.warning({
            title: '提示',
            content: res.message
          })
        }
        this.modal.show = false
      })
    },
    init () {
      this.searchorGroups = []
      this.searchor.forEach((searchItem) => {
        this.searchorGroups.push(searchItem)
        if (searchItem.key) {
          this.$set(this.queryObj, searchItem.key, searchItem.default)
        }
        if (searchItem.keys) {
          this.multiSelectEvent(searchItem.default, null, searchItem)
        }
      })
    },
    filterExpandSearchor (index) {
      if (index < 4) {
        return true
      }
      if (index >= 4 && this.isSearchorExpand) {
        return true
      }
    },
    simpleSelectEvent (value, optionItem, searchItem) {
      // 单项取值的组件，都用v-model绑定了this.queryObj，暂时不需要手动关联
    },
    // 有两类选项
    multiSelectEvent (value, optionItem, searchItem) {
      // 赋值元素视图
      this.setComponentView(searchItem, value)

      // 重置操作
      if (value === '' || value === undefined || value === null || utils.isEmptyArray(value) || utils.isEmptyObject(value)) {
        return searchItem.keys.forEach((key, index) => {
          this.queryObj[key] = null
        })
      }

      // 主要场景 UserSelect
      if (searchItem.component === 'UserSelect') {
        // userSelect的选项被构造了一次，需要重新解构出来
        const userOption = value.length ? JSON.parse(value[0].key) : null
        searchItem.keys.forEach((key, index) => {
          const optionKey = searchItem.optionKeys[index]
          this.queryObj[key] = userOption ? userOption[optionKey] : null
        })
      }

      // 主要场景：DepatmentSelect
      if (searchItem.component === 'DepatmentSelect') {
        searchItem.keys.forEach((key, index) => {
          const optionKey = searchItem.optionKeys[index]
          this.queryObj[key] = optionItem ? optionItem[optionKey] : null
        })
      }

      // value = 'Array', optionItem = 'Array' => Select multi, RangPicker
      if (utils.isArray(value) && utils.isArray(optionItem)) {
        searchItem.keys.forEach((key, index) => {
          this.queryObj[key] = optionItem[index] || null
        })
      }
    },
    async expandEvent (opr, record) {
      if (opr && this.expandApi) {
        this.expandedRowKeys.push(record[this.rowKey])
        const res = await this.getApiFunction(this.expandApi)(this.formatQueryObj({ ...record }))
        if (res.code === 200) {
          if (res.data) {
            const children = this.evalHandle(res.data)

            // 关联父级节点数据
            const cpyParent = { ...record }
            delete cpyParent.children
            children.forEach((child) => {
              child.parentId = cpyParent[this.rowKey]
              child.parent = cpyParent
            })

            // 把子节点插入整棵树
            this.insertTreeNode(this.dataList, record[this.rowKey], children)

            // 刷新数据
            this.update()
          }
        } else {
          this.$modal.warning({
            title: '提示',
            okText: '确定',
            content: res.message
          })
        }
      }
      if (!opr) {
        // 收起时，把 record 从 this.expandedRowKeys 中剔除
        this.spliceExpandRowKeys(record)
      }
    },
    spliceExpandRowKeys (record) {
      for (let index = 0; index < this.expandedRowKeys.length; index++) {
        const key = this.expandedRowKeys[index]
        if (key === record[this.rowKey]) {
          this.expandedRowKeys.splice(index, 1)
          break
        }
      }
    },
    update () {
      this.$emit('update', this.dataList)
    },
    insertTreeNode (loopNodes, insertNodeId, willInsertNodes, resolve) {
      for (let index = 0; index < loopNodes.length; index++) {
        const loopNode = loopNodes[index]
        if (loopNode[this.rowKey] === insertNodeId) {
          // 先把子项从 this.expandedRowKeys 中剔除，再插入树中
          willInsertNodes.forEach((node) => {
            this.spliceExpandRowKeys(node)
          })
          loopNode.children = willInsertNodes
          return false
        }
        if (utils.isArray(loopNode.children) && loopNode.children.length) {
          this.insertTreeNode(loopNode.children, insertNodeId, willInsertNodes, resolve)
        }
      }
    },
    // table全选功能
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.$emit('selectChange', selectedRowKeys, selectedRows)
    },
    // 重置
    async resetSearch () {
      // 充填必填的搜索项，选取默认值
      this.searchor.forEach((searchItem) => {
        if (!searchItem.required) {
          if (searchItem.key) {
            this.resetvalueByType(this.queryObj, searchItem.key)
          }
          if (searchItem.keys) {
            searchItem.keys.forEach((key) => {
              this.resetvalueByType(this.queryObj, key)
            })
          }
          // 重置dom视图
          const component = this.$refs[`${searchItem.component}${searchItem.key || searchItem.keys[0]}`][0]
          if (component) {
            this.resetvalueByType(component, 'value')
          }
        }
      })
      this.pagination.current = 1
      this.fetchData()
    },
    // 设置组件的视图
    setComponentView (searchItem, view) {
      const ref = `${searchItem.component}${searchItem.key ? searchItem.key : searchItem.keys[0]}`
      if (this.$refs[ref] && this.$refs[ref][0]) {
        this.$set(this.$refs[ref][0], 'value', view)
      } else {
        return setTimeout(() => {
          this.setComponentView(searchItem, view)
        }, 150)
      }
    },
    // 根据value类型，进行置空操作
    resetvalueByType (obj, key) {
      if (utils.isString(obj[key])) {
        obj[key] = ''
      }
      if (utils.isNumber(obj[key])) {
        obj[key] = null
      }
      if (utils.isObject(obj[key])) {
        obj[key] = {}
      }
      if (utils.isArray(obj[key])) {
        obj[key] = []
      }
    },
    // 导入
    async beforeUpload (file) {
      const pass = utils.verifyUploadType(file.name, this.supportSeries)
      if (!pass) return false
      if (!this.importApi) return false
      const params = new FormData()
      params.append('file', file)
      const res = await this.getApiFunction(this.importApi)(params)
      if (res.code === 200) {
        this.$message.success('导入成功')
        this.fetchData()
      } else {
        this.$modal.warning({
          title: '提示',
          okText: '确定',
          content: res.message
        })
      }
      return false
    },
    /**
     * @injectParam 一般是由父级组件调用时，传入的
     */
    search (injectParam = {}) {
      this.pagination.current = 1
      this.fetchData({ ...injectParam })
    },
    /**
     * 提供语义化接口，功能和fetchData一致
     */
    reload () {
      this.fetchData()
    },
    formatQueryObj (injectparams) {
      const queryParams = JSON.parse(JSON.stringify({ ...this.queryObj }))
      // 处理 UserSelect 组件的取值
      // UserSelect 有两种用法
      // 1. searchItem.key 只获取一个值，选中项是个数据，需要format处理，默认只获取code
      // 2. searchItem.keys 获取多个值，但是 this.multiSelectEvent 已经对取值进行处理了
      // 原始取值样例：[{key: "{"key":"11111111","label":"hongkong"}", label: "11111111 hongkong"}]
      this.searchor.forEach((searchItem) => {
        if (searchItem.component === 'UserSelect') {
          if (searchItem.key && utils.isArray(queryParams[searchItem.key])) {
            if (utils.isArray(queryParams[searchItem.key])) {
              if (queryParams[searchItem.key][0]) {
                const itemOption = JSON.parse(queryParams[searchItem.key][0].key)
                queryParams[searchItem.key] = itemOption.key
              }
            }
          }
        }
      })

      // 转换 Moment 类型的值
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] instanceof moment) {
          queryParams[key] = moment(queryParams[key]).format('YYYY-MM-DD')
        }
      })

      // 手动清理空值的字段
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] === '' || queryParams[key] === null || queryParams[key] === undefined) {
          delete queryParams[key]
        }
        if (utils.isEmptyArray(queryParams[key]) || utils.isEmptyObject(queryParams[key])) {
          delete queryParams[key]
        }
      })

      // 分页参数
      const pageParam = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current
      }
      // 【queryParams】来源：
      //    页面上的搜索栏
      // 【injectparams】来源：
      //    当外部直接调用this.search方法时，有可能注入额外参数
      //    或者当前是树级表格，点击展开触发的this.expandEvent方法，会把当前行数据当作参数传入
      // 【this.dataParams】来源：
      //    由父级组件定制，当前组件不会对这个数据进行过滤，所以定制时，保持数据的纯净（可以直接交到后端）
      return { ...queryParams, ...injectparams, ...this.dataParams, ...pageParam }
    },
    // 导出
    exportOut () {
      if (this.dataList.length === 0) {
        return this.$modal.warning({
          title: '提示',
          okText: '确定',
          content: '暂无数据导出!'
        })
      }
      // eslint-disable-next-line no-unused-vars
      let ids = ''
      if (this.selectedRows && this.selectedRows.length > 0) {
        this.selectedRows.filter(item => {
          ids += item.id + ','
        })
        ids = ids.substring(0, ids.length - 1)
      }
      this.getApiFunction(this.exportApi)(this.formatQueryObj({ selectedRows: this.selectedRows, ids }))
    },
    // 导入模板下载
    downLoadTemplate () {
      api.exportFile(this.templateApi)
    },
    getApiFunction (apiNameOrFunction) {
      if (utils.isFunction(apiNameOrFunction)) {
        return apiNameOrFunction
      }
      if (utils.isString(apiNameOrFunction)) {
        return api[apiNameOrFunction] || function () {}
      }
      if (utils.isUndefined(apiNameOrFunction)) {
        return function () {}
      }
    },
    evalHandle (data) {
      let res = {}
      if (this.$props.dataDict &&
        utils.isString(this.$props.dataDict)) {
        res = eval('data' + '.' + this.$props.dataDict)
      } else {
        res = data
      }
      return res
    },
    detectTotal (data) {
      let pageObj = data
      if (this.$props.dataDict &&
        utils.isString(this.$props.dataDict)) {
        // 一般后端的模型，都把分页数据放在了实例数据的同一层结构
        // 比如：res.data.pageinfo.records
        // 那么：res.data.pageinfo.total
        const dicts = this.$props.dataDict.split('.')
        if (dicts && dicts.length > 1) {
          dicts.pop()
          pageObj = eval('data' + '.' + dicts.join())
        }
      }
      return pageObj.total || 0
    },
    // 获取列表数据
    async fetchData (injectparams = {}) {
      if (this.isLoading) return false
      if (!this.dataApi) return false
      this.isLoading = true
      this.selectedRows = []
      this.selectedRowKeys = []
      const res = await this.getApiFunction(this.dataApi)(this.formatQueryObj(injectparams))
      this.isLoading = false
      if (res.code === 200) {
        if (res.data) {
          this.dataList = this.evalHandle(res.data)
          this.pagination.total = this.detectTotal(res.data)
          this.expandedRowKeys = []
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
    onChangePage (val) {
      this.pagination.current = val.current
      this.pagination.pageSize = val.pageSize
      this.fetchData()
    }
  }
}
</script>
<style lang="less" scoped>
.trans {
  transform: rotate(90deg);
}
.trans-reverse {
  transform: rotate(270deg);
}
</style>
