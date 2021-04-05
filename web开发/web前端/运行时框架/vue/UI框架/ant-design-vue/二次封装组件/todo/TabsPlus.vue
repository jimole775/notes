<template>
  <a-tabs
    hide-add
    type="editable-card"
    v-model="tabProxy.activeId"
    @edit="tabEditEvent"
    @change="tabChangeEvent"
  >
    <a-tab-pane
      v-for="pane in panesView"
      :key="pane.tabId"
      :tab="pane.tabName"
      :closable="!!pane.closable"
    />
  </a-tabs>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
  name: 'TabsPlus',
  props: {
    tabProxy: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      usedListIds: [],
      panesView: []
    }
  },
  watch: {
    'tabProxy.activeId': {
      handler (id) {
        if (id) {
          const curPane = this.getTargetPane(id)
          // 如果目标pane时detail类型,就需要关联跳转前的list的tabid
          // 主要为了防止detail页内用lastListId查询数据时的报错
          if (curPane.type === 'apply') {
            curPane.__apply_listId__ = this.tabProxy.lastListId
          }
          if (curPane.type === 'detail') {
            curPane.__detail_listId__ = this.tabProxy.lastListId
          }
          this.showPane(id)
          this.showPage(id)
        }
      },
      immediate: true
    },
    'tabProxy.lastListId': {
      handler (id) {
        if (id) {
          this.setLastListId(id)
          this.$emit('update')
        }
      }
    }
  },
  async created () {
    await this.init()
    this.showPane(this.tabProxy.activeId)
  },
  methods: {
    // ...mapActions(['loadMenuButtons']),
    async init () {
      // if (!this.$store.state.global.menuButtons || this.$store.state.global.menuButtons.length === 0) {
      //   await this.loadMenuButtons()
      // }
      for (let index = this.tabProxy.panes.length - 1; index >= 0; index--) {
        const pane = this.tabProxy.panes[index]
        const permission = pane.permission || {}
        pane.show = permission.config ? this.$store.state.global.menuButtons.includes(permission.config) : pane.show
        if (pane.show) {
          this.tabProxy.lastListId = index + ''
          this.tabProxy.activeId = index + ''
        }
      }
      return Promise.resolve()
    },
    showPane (id) {
      const curPane = this.getTargetPane(id)
      curPane.show = true
      this.panesView = this.getPanesView()
    },
    hidePane (id) {
      const curPane = this.getTargetPane(id)
      curPane.show = false
      this.panesView = this.getPanesView()
    },
    getPanesView () {
      return this.tabProxy.panes.filter(pane => pane.show)
    },
    addDetailTab (id, recordData) {
      if (this.isUniqueTanpe(recordData)) {
        const newPane = { tabName: '', type: id === '1' ? 'apply' : 'detail', tabId: '1_1', closable: true, show: true, visible: true, lastListId: '0', recordData: {} }
        const lastPane = this.getTargetPane(this.getLastListId())
        newPane.tabId = this.upRiseTabId(this.getLastEditId(id))
        newPane.tabName = lastPane.proxyName.apply
        newPane.lastListId = lastPane.tabId
        newPane.recordData = recordData
        this.tabProxy.activeId = newPane.tabId
        this.tabProxy.panes.push(JSON.parse(JSON.stringify(newPane)))
      } else {
        return this.changeTabByRecordData(recordData)
      }
    },
    offVisible () {
      this.tabProxy.panes.forEach((pane) => {
        pane.visible = false
      })
    },
    isUniqueTanpe (recordData) {
      let isUnique = true
      for (let index = 0; index < this.tabProxy.panes.length; index++) {
        const pane = this.tabProxy.panes[index]
        if (pane.recordData && pane.recordData.id === recordData.id) {
          isUnique = false
          break
        }
      }
      return isUnique
    },
    changeTabByRecordData (recordData) {
      for (let index = 0; index < this.tabProxy.panes.length; index++) {
        const pane = this.tabProxy.panes[index]
        if (pane.recordData && pane.recordData.id === recordData.id) {
          this.tabProxy.activeId = pane.tabId
          break
        }
      }
    },
    // tab切换事件
    tabChangeEvent (id) {
      const curPane = this.getTargetPane(id)
      // curPan.type === undefined 属于向前兼容
      if (curPane.type === 'list' || curPane.type === undefined) {
        this.setLastListId(id)
      }
      // 目标tab如果是detail，
      // 需要保持 lastListId 是 list 类型的 tabId
      // 因为，申请和详情页有时候需要根据 list 的 tabId 去匹配一些数据
      if (curPane.type === 'apply') {
        this.setLastListId(curPane.__apply_listId__)
      }
      if (curPane.type === 'detail') {
        this.setLastListId(curPane.__detail_listId__)
      }
    },
    setLastListId (id) {
      const curPane = this.getTargetPane(id)
      if (curPane.type === 'list' || curPane.type === undefined) {
        this.tabProxy.lastListId = id
        if (!this.usedListIds) {
          this.usedListIds = []
        }
        this.usedListIds.push(id)
        if (this.usedListIds.length > 99) {
          this.usedListIds.shift()
        }
      }
    },
    getLastListId () {
      if (!this.usedListIds) {
        this.usedListIds = []
      }
      return this.usedListIds[this.usedListIds.length - 1] || '0'
    },
    getLastEditId (matchedId) {
      let res = '0_' + matchedId
      for (let index = this.tabProxy.panes.length - 1; index > 0; index--) {
        const pane = this.tabProxy.panes[index]
        if (pane.tabId.length > 1 && this.getLastWord(pane.tabId) === matchedId) {
          res = pane.tabId
          break
        }
      }
      return res
    },
    // tab新增或者删除事件
    tabEditEvent (id, action) {
      if (action === 'remove') {
        this.removePane(id)
      }
    },
    // 关闭标签页
    // 两种情景触发当前方法：
    // 1. 当前只有用户点击【x】操作
    // 2. 审批完毕时，this.$emit('removePane')进行调用
    removePane (id) {
      for (let index = 0; index < this.tabProxy.panes.length; index++) {
        const pane = this.tabProxy.panes[index]
        if (pane.tabId === id) {
          this.tabProxy.panes.splice(index, 1)
          break
        }
      }
      // activeId 切换到最后一个 list
      this.tabProxy.activeId = this.getLastListId()
      // 这里手动showPane，是为了防止activeId没改变，导致没触发watch方法的情况
      this.showPane(this.tabProxy.activeId)
    },
    getTargetPane (targetId) {
      let targetPane = this.tabProxy.panes.filter((pan) => pan.tabId === targetId)
      targetPane = targetPane && targetPane.length ? targetPane[0] : {}
      return targetPane
    },
    showPage (id) {
      this.tabProxy.showList = false
      this.tabProxy.showApply = false
      this.tabProxy.showDetail = false
      if (/_/.test(id)) {
        if (this.getLastWord(id) === '1') {
          this.tabProxy.showApply = true
        }
        if (this.getLastWord(id) === '2') {
          this.tabProxy.showDetail = true
        }
      } else {
        this.tabProxy.showList = true
      }
    },
    upRiseTabId (id) {
      const scrollId = id.split('_')[0]
      const typeSign = id.split('_')[1]
      return (Number.parseInt(scrollId) + 1) + '_' + typeSign
    },
    getLastWord (cent) {
      if (!cent) return ''
      return cent[cent.length - 1]
    }
  }
}
</script>
