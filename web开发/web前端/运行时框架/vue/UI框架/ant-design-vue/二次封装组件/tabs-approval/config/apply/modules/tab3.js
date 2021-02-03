import { formItems } from '../config/FormItems'
const BaseInfoEdit = { component: 'FormItemRender', title: 'basexxx', mode: 'edit', formItems: formItems[3].baseInfo }
const ApplyInfoEdit = { component: 'FormItemRender', title: 'applyxxx', mode: 'edit', formItems: formItems[3].applyInfo }

export const changeModulesMap = {
  components: [
    BaseInfoEdit,
    ApplyInfoEdit
  ]
}
