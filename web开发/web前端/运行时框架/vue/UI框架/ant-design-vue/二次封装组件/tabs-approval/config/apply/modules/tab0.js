import { formItems } from '../config/FormItems'
const BaseInfoEdit = { component: 'FormItemRender', title: 'basexxx', mode: 'edit', formItems: formItems[0].baseInfo }
const ApplyInfoEdit = { component: 'FormItemRender', title: 'applyxxx', mode: 'edit', formItems: formItems[0].applyInfo }

export const demandModulesMap = {
  components: [
    BaseInfoEdit,
    ApplyInfoEdit
  ]
}
