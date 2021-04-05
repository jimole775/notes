<template>
  <div>
    <a-collapse
      :bordered="false"
      :active-key="['1','2','3','4','5']"
    >
      <template v-for="(componentItem, index) in activeComponents">
        <a-collapse-panel
          :header="componentItem.title"
          :key="`${index + 1}`"
          class="m-block"
        >
          <component
            :ref="`${componentItem.component}${index}`"
            :is="componentItem.component"
            :operation-item="componentItem.operationItem"
            :columns="componentItem.columns"
            :form-items="componentItem.formItems"
            :mode="componentItem.mode"
            :tab-proxy="tabProxy"
          />
        </a-collapse-panel>
      </template>
    </a-collapse>
    <div class="ppproject-footer">
      <a-button type="primary" ghost @click="emitApply">apply</a-button>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import moment from 'moment'
import utils from '@/utils'
import FormItemRender from './components/FormItemRender'
import FormItemViewRender from './components/FormItemViewRender'
export default {
  components: {
    FormItemRender,
    FormItemViewRender
  },
  props: {
    applyModulesMap: {
      type: Object,
      required: true
    },
    apimap: {
      type: Object,
      required: true
    },
    tabProxy: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      basicData: {}
    }
  },
  computed: {
    activeComponents () {
      return this.applyModulesMap.components || []
    }
  },
  methods: {
    moment,
    formatMoney: utils.formatMoney,
    async emitApply () {
      const { successData, failureTips } = await this.getComponentsFieldsValue()
      if (failureTips.length) {
        return this.$modal.warning({
          title: '提示',
          content: failureTips[0]
        })
      }
      const params = {
        ...successData
      }
      this.startApprove(params)
    },
    // 发起审批
    async startApprove (params) {
      let res = await api[this.apimap.apply](params)
      if (res.code === 200) {
        this.$message.success('操作成功')
        this.$emit('close')
      } else {
        this.$modal.warning({
          title: '提示',
          content: res.message
        })
      }
    },
    getComponentsFieldsValue () {
      return new Promise(async (resolve) => {
        let successData = {}
        const failureTips = []
        for (let index = 0; index < this.activeComponents.length; index++) {
          const component = this.activeComponents[index]
          const componentDom = await this.$refs[component.component + index][0]
          const editData = await componentDom.getFieldsValue()
          if (editData.type === 'failure') {
            failureTips.push(editData.message)
          } else {
            successData = { ...successData, ...editData.data }
          }
        }
        return resolve({ failureTips, successData })
      })
    },
    scrollTo (id) {
      const targetDom = document.querySelector('#' + id)
      if (!targetDom) return false
      targetDom.style.borderColor = '#ff0000'
      targetDom.style.transition = 'border 3s'
      setTimeout(() => {
        targetDom.style.borderColor = '#d9d9d9'
      }, 3000)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = '#' + id
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    updateDataSet (val) {
      console.log(val)
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
