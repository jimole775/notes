import { mapActions } from 'vuex'
export default {
  data () {
    /**
     * todoParams 固定属性：
     * __page__: 处理跳转类型 => "list": 列表页，"detail": 详情页，加这个属性，主要是为了向前兼容，因为早前的版本，目标模块没有整合对应的接口，写的比较散乱
     * __type__: 处理数据类型 => "apply": 我的申请，"approve": 我的审批，主要是为了区分查询字段的默认赋值“申请人”，“当前处理人”
     * __tab__: 处理tab类型 => 直接对应tab下标
     * handler: 用于给 UserSelect 组件赋值的
     * title: 一般对应每个模块详情页的必要查询参数（比如项目包，会转成prNo, flowNo）
     * businessId: 一般对应每个模块的流程实例ID（比如项目包，会转成purchaseFlowInstanceId）
     */
    return {
      todoParams: this.$store.getters.getTodoParams
    }
  },
  mounted () {
    if (this.todoParams) {
      this.doRouting()
      this.clearStorage()
    }
  },
  methods: {
    // 获取已存储的全局的todoParams对象
    ...mapActions(['loadTodoParams']),
    // 给查询组件赋默认值
    transferSearchor (searchor = []) {
      return searchor.map((searchItem) => {
        if (this.todoParams) {
          if (searchItem.title === '申请人' && this.todoParams.__type__ === 'apply') {
            searchItem.default = this.todoParams.handler
          }
          if (searchItem.title === '当前处理人' && this.todoParams.__type__ === 'approve') {
            searchItem.default = this.todoParams.handler
          }
        }
        return searchItem
      })
    },
    doRouting () {
      if (this.todoParams.__page__ === 'detail') {
        // 根据 __tab__ 存储 lastListId (重要)
        if (this.todoParams.__tab__) {
          this.tabProxy.lastListId = this.todoParams.__tab__
        }
        // “2” 是tab的下标，默认所有审批详情页的tab下标都是 “2”
        // this.addDetailTab 为目标模块提供的方法，功能为跳转到审批页面
        this.addDetailTab && this.addDetailTab('2', this.todoParams)
      }
      if (this.todoParams.__page__ === 'list') {
        // 根据 __tab__ 切换 tab 页签
        if (this.todoParams.__tab__) {
          this.tabProxy.activeId = this.todoParams.__tab__
          this.tabProxy.lastListId = this.todoParams.__tab__
        }
      }
    },
    clearStorage () {
      this.loadTodoParams(null)
    }
  }
}
