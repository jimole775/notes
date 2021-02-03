<template>
  <div>
    <PPApprovalStepBar
      :id="recordData.flowInstanceId"
      @update="updateCurrentNode"
    />
    <a-collapse
      :bordered="false"
      :active-key="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']"
    >
      <template v-for="(componentItem, index) in activeComponents">
        <a-collapse-panel
          :header="componentItem.title"
          :key="`${index + 1}`"
          class="m-block"
        >
          <component
            :ref="componentItem.component"
            :is="componentItem.component"
            :mode="componentItem.mode"
            :data-source="basicData"
            :tab-proxy="tabProxy"
            :columns="componentItem.columns"
            :form-items="componentItem.formItems"
            :operation-item="componentItem.operationItem"
            :business-id="recordData.id"
            :business-type="apimap.logType"
            @submit="submitHandler"
          />
        </a-collapse-panel>
      </template>
    </a-collapse>
  </div>
</template>
<script>
import api from '@/api'
import moment from 'moment'
import utils from '@/utils'
import baseMixins from '@/mixins/baseMixins.js'
import FormItemRender from './components/FormItemRender'
import FormItemViewRender from './components/FormItemViewRender'
import PPBaseInfo from '@/components/PPBaseInfo'
import PPApprovalStepBar from '@/components/PPApprovalStepBar'
import ApprovalOperation from '@/components/ApprovalOperation'
export default {
  components: {
    PPBaseInfo,
    FormItemRender,
    FormItemViewRender,
    ApprovalOperation,
    PPApprovalStepBar
  },
  mixins: [baseMixins],
  props: {
    tabProxy: {
      type: Object,
      required: true
    },
    approvalModulesMap: {
      type: Object,
      required: true
    },
    apimap: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      approvalResult: '1',
      currentPane: {},
      basicData: {},
      currentNode: {},
      form: this.$form.createForm(this)
    }
  },
  watch: {
    tabProxy: {
      async handler (tabProxy) {
        if (!tabProxy) return false
        const activePane = tabProxy.panes.filter((pane) => pane.tabId === tabProxy.activeId)
        this.currentPane = activePane ? activePane[0] : {}
        const res = await api[this.apimap.detail](this.currentPane.recordData)
        if (res.code === 200) {
          this.basicData = { ...res.data }
        } else {
          this.$message.warning(res.message)
        }
      },
      immediate: true
    }
  },
  computed: {
    recordData () {
      return this.currentPane.recordData || {}
    },
    isApprovallor () {
      return this.currentNode &&
        this.currentNode.approvalAccountList &&
          this.currentNode.approvalAccountList.includes(this.currentAccount)
    },
    activeModule () {
      return this.approvalModulesMap && this.approvalModulesMap[this.currentNode.nodeCode]
    },
    activeComponents () {
      if (!this.activeModule) return []
      return this.isApprovallor ? this.activeModule.components.permission : this.activeModule.components.dispermission
    }
  },
  methods: {
    moment,
    formatMoney: utils.formatMoney,
    updateCurrentNode (node) {
      this.currentNode = node
    },
    async getComponentsValues () {
      const params = {}
      const tips = []
      for (let index = 0; index < this.activeComponents.length; index++) {
        const componentItem = this.activeComponents[index]
        if (componentItem.mode === 'edit') {
          await this.$refs[componentItem.component]
          const validRes = await this.$refs[componentItem.component][0].getFieldsValue()
          if (validRes.type === 'success') {
            Object.assign(params, validRes.data)
          } else {
            tips.push(validRes.message)
          }
        }
      }
      return Promise.resolve({ params, tips })
    },
    async submitHandler () {
      const values = await this.getComponentsValues()
      if (values.tips.length) {
        this.$modal.warning({
          title: '提示',
          content: values.tips[0]
        })
      } else {
        this.startApprove({
          ...values.params,
          id: this.recordData.id,
          instanceId: this.basicData.flowInstanceId,
          currentFlowNode: this.basicData.flowNode
        })
      }
    },
    // 发起审批
    async startApprove (obj) {
      let res = await api[this.apimap.approval](obj)
      if (res.code === 200) {
        this.$message.success('操作成功')
        this.$emit('close')
      } else {
        this.$modal.warning({
          title: '提示',
          content: res.message
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ppproject-footer {
  text-align: center;
  margin: 2rem 0;
  button {
    width: 16rem;height:2.6rem;
  }
}
/deep/.ant-row {
  line-height: 2.5;
}
</style>
