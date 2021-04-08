/** 无法绑定form表单 */
export default {
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
      form1: 'eaweas',
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    console.log('mounted', this.form.getFieldsValue())
  },
  methods: {
    labelRender (formItem) {
      let labelC = null
      const h = this.$createElement
      if (formItem.label) {
        labelC = h('span', { slot: 'label' }, formItem.label)
      }
      if (formItem.labelCustomRender) {
        labelC = formItem.labelCustomRender(h)
      }
      return labelC
    },
    componentChangeEvent (val, item) {
      if (item.key === 'changeType') {
        this.dataSource[item.key] = val
        this.activeFormItems = this.cutDisabledItem(this.dataSource, this.formItems)
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      }
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
              data: {},
              message: ''
            })
          }
        })
      })
    }
  },
  render (h) {
    // const { formItems: activeFormItems } = self.props
    // const $vm = self.parent
    console.log('render')
    return h(
      'a-form',
      { props: { form: this.form } },
      [h('a-row', {}, this.formItems.map((formItem, index) => {
        this.form.setFieldsValue({
          [formItem.key]: 1
        })
        return h('a-col', {
          props: {
            span: formItem.layout ? formItem.layout.span : 8,
            key: index
          }
        }, [
          h('a-form-item', {
            props: {
              labelCol: { span: formItem.layout ? formItem.layout.label : 6 },
              wrapperCol: { span: formItem.layout ? formItem.layout.wrapper : 16 }
            }
          }, [
            this.labelRender(formItem),
            h(formItem.component, {
              props: {
                ...formItem.props,
                'initial-value': formItem.value,
                'default-value': formItem.value /** Uploader的属性 */,
                'default-files': formItem.value /** UploaderMultiple的属性 */,
                'v-decorator': [formItem.key, { initialValue: formItem.value, rules: [{ required: true, message: `请确认必填项` }] }]
              },
              attrs: {
                ...formItem.attrs
              },
              on: {
                change: (val) => this.componentChangeEvent(val, formItem)
              }
            }, [
              formItem.customRender && formItem.customRender(h)
            ])
          ])
        ])
      }))]
    )
  }
}
