<template>
  <a-form :form="form">
    <a-row>
      <template v-for="(operation, index) in activeFormItems">
        <a-col :span="operation.layout.span" :key="index">
          <a-form-item :label-col="{span: operation.layout.label}" :wrapper-col="{span: operation.layout.wrapper}">
            <template slot="label">
              <span>
                {{ operation.label }}
              </span>
            </template>
            <component
              :min="0"
              :is="operation.component"
              :dync-inject="operation.dyncInject"
              :initial-value="operation.value"
              :default-value="operation.value"
              v-bind="operation.props"
              @change="(val) => componentChangeEvent(val, operation)"
              v-decorator="[operation.key, {initialValue: operation.value, rules: [{ required: operation.required, message: `请确认${operation.label}` }]}]"
            >
              <span v-if="operation.component==='span'">
                {{ operation.value }}
              </span>
              <span v-if="operation.component==='ARadioGroup' && operation.mode==='edit'">
                <a-radio value="0">
                  <span>是</span>
                </a-radio>
                <a-radio value="1">
                  <span>否</span>
                </a-radio>
              </span>
            </component>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
  </a-form>
</template>
<script>
import utils from '@/utils'
// import moment from 'moment'
import HelperDesc from './chunks/HelperDesc.vue'
import StandardDesc from './chunks/StandardDesc.vue'
export default {
  name: 'FormItemRender',
  components: { HelperDesc, StandardDesc },
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      activeFormItems: []
    }
  },
  watch: {
    formItems: {
      handler (val) {
        if (val) {
          const dataSource = this.dataSource || {}
          utils.bindDefaultValueForComponent(dataSource, val)
          this.fillOmitDefaultValueForComponent(dataSource, val)
          this.cutDisabledItem()
        }
      },
      immediate: true
    }
  },
  computed: {
    user () {
      return this.$store.state.global.user
    },
    edit () {
      return this.mode === 'edit'
    },
    readonly () {
      return this.mode === 'readonly'
    },
    requirementTypeOptions () {
      return this.$store.getters.getDictByGroupCode('odc_requirement_type')
    }
  },
  beforeDestroy () {
    this.clearFormItemsDyncInject()
  },
  methods: {
    clearFormItemsDyncInject () {
      for (let index = 0; index < this.formItems.length; index++) {
        const formItem = this.formItems[index]
        if (formItem.dyncInject) {
          formItem.dyncInject = {}
        }
      }
    },
    getRelativeOperation (patchItem) {
      let res = null
      for (let index = 0; index < this.formItems.length; index++) {
        const formItem = this.formItems[index]
        if (formItem.depend === patchItem.key) {
          if (!formItem.dyncInject) formItem.dyncInject = {}
          res = formItem
          break
        }
      }
      return res
    },
    getTypeStandard (val, formItem) {
      const targetItem = this.getRelativeOperation(formItem)
      this.requirementTypeOptions && this.requirementTypeOptions.forEach((option) => {
        if (val === option.itemCode) {
          this.$set(targetItem.dyncInject, 'standardDesc', option.attr1)
          this.$set(targetItem.dyncInject, 'standardHtml', option.attr4)
          this.$set(targetItem.dyncInject, 'standardType', option.itemName)
        }
      })
    },
    componentChangeEvent (val, item) {
      if (item.key === 'changeType') {
        this.dataSource[item.key] = val
        this.cutDisabledItem()
      }
      if (item.key === 'odcType') {
        this.getTypeStandard(val, item)
      }
    },
    // 裁剪不需要显示的字段
    cutDisabledItem () {
      this.activeFormItems = []
      const dataSource = this.dataSource || {}
      this.formItems.forEach((item) => {
        if (item.key === 'securityFlag' && dataSource['changeType'] === '2') {
          return false
        }
        this.activeFormItems.push(item)
      })
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
    // 根据字段来补充遗漏的默认数据
    // 比如“申请人”，“申请部门”之类的字段，
    // 它们需要从其他地方获取的数据，而不是dataSource能获取的数据
    // 并且它们的展示形似有时候是span，有时候是UserSelect，并不固定，所以需要手写逻辑
    fillOmitDefaultValueForComponent (dataSource, formItems) {
      formItems.forEach((item) => {
        switch (item.key) {
          case 'applier':
            item.value = dataSource.applyName
              ? `${dataSource.applyAccount} ${dataSource.applyName}`
              : `${this.user.employeeNumber} ${this.user.name}`
            break
          case 'applyDepartment':
            item.value = dataSource.organizationName
              ? dataSource.organizationName
              : this.user.apartmentName
            break
          case 'useDepartment':
            let apartmentCode = this.user.apartmentCode
            let apartmentName = this.user.apartmentName
            if (dataSource.organizationCode && dataSource.organizationName) {
              apartmentCode = dataSource.organizationCode
              apartmentName = dataSource.organizationName
            }
            item.value = utils.spillOptionItems(apartmentCode, apartmentName)
            break
          case 'currentHandler':
            item.value = dataSource.currentName
              ? `${dataSource.currentAccount} ${dataSource.currentName}`
              : `${this.user.employeeNumber} ${this.user.name}`
            break
        }
      })
    },
    getFieldsValue () {
      return new Promise((resolve) => {
        this.form.validateFields((err, values) => {
          if (err) {
            resolve({
              type: 'failure',
              data: null,
              message: '请先完成必填项！'
            })
          } else {
            resolve({
              type: 'success',
              data: {
                ...this.fillOmitFields(utils.formatFormValues(values, this.formItems))
              },
              message: ''
            })
          }
        })
      })
    },
    // 补充遗漏字段，比如申请人，申请部门等
    fillOmitFields (params) {
      if (!params.organizationCode) {
        params.organizationCode = this.user.apartmentCode
      }
      if (!params.organizationName) {
        params.organizationName = this.user.apartmentName
      }
      if (!params.applyCode) {
        params.applyCode = this.user.employeeNumber
      }
      if (!params.applyName) {
        params.applyName = this.user.name
      }
      return params
    }
  }
}
</script>

<style lang="less" scoped>
.no-border {
  border: 0
}
</style>
