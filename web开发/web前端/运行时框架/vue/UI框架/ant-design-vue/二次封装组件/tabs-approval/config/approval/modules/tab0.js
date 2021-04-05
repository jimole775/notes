import utils from '@/utils'
import { baseInfoColumns } from '../config/BaseInfo.columns'
import { applyInfoColumns } from '../config/ApplyInfo.columns'
import { approvalOperationItem } from '../config/Approval.operation'
import { formItems } from '../config/FormItems'
const ODCStandardEdit = { component: 'ODCStandard', title: '建设标准', mode: 'edit' }
const ODCStandardReadonly = { component: 'ODCStandard', title: '建设标准', mode: 'readonly' }
const BaseInfoReadonly = { component: 'FormItemViewRender', title: '基本信息', mode: 'readonly', columns: baseInfoColumns[0] }
const ApplyInfoReadonly = { component: 'FormItemViewRender', title: '申请信息', mode: 'readonly', columns: applyInfoColumns[0] }
const BaseInfoEdit = { component: 'FormItemRender', title: '基本信息', mode: 'edit', formItems: formItems[0].baseInfo }
const ApplyInfoEdit = { component: 'FormItemRender', title: '申请信息', mode: 'edit', formItems: formItems[0].applyInfo }
const ApprovalOperation = { component: 'ApprovalOperation', title: '审批操作', mode: 'edit', operationItem: approvalOperationItem }
const PPApproveLog = { component: 'PPApproveLog', title: '操作日志', mode: 'readonly' }
export const demandModulesMap = {
  start: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [
        BaseInfoEdit,
        ApplyInfoEdit,
        utils.clone(ApprovalOperation, 'operationItem', {
          inputs: [
            {
              label: '审批意见',
              dedfault: '',
              key: 'approvalContent',
              component: 'ATextarea',
              permissions: ['1'],
              required: true
            }
          ]
        }),
        PPApproveLog
      ]
    }
  },
  department_approval: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ApprovalOperation, PPApproveLog]
    }
  },
  out_manager_approval: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ApprovalOperation, PPApproveLog]
    }
  },
  ceg_approval: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ApprovalOperation, PPApproveLog]
    }
  },
  information_security_approval: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, ODCStandardReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ODCStandardEdit, ApprovalOperation, PPApproveLog]
    }
  },
  it_network_security_approval: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, ODCStandardReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ODCStandardEdit, ApprovalOperation, PPApproveLog]
    }
  },
  end: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, ODCStandardReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ODCStandardReadonly, PPApproveLog]
    }
  }
}
