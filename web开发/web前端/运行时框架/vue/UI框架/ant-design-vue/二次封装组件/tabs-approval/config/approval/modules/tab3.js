import { baseInfoColumns } from '../config/BaseInfo.columns'
import { applyInfoColumns } from '../config/ApplyInfo.columns'
import { formItems } from '../config/FormItems'
import { approvalOperationItem, approvalOperationItemForParallelNodes, approvalOperationItemForStartNode } from '../config/Approval.operation'
const BaseInfoReadonly = { component: 'FormItemViewRender', title: 'basexxx', mode: 'readonly', columns: baseInfoColumns[3] }
const ApplyInfoReadonly = { component: 'FormItemViewRender', title: 'applyxxx', mode: 'readonly', columns: applyInfoColumns[3] }
const ApplyInfoEdit = { component: 'FormItemRender', title: 'applyxxx', mode: 'edit', formItems: formItems[3].applyInfo }
const ApprovalOperation = { component: 'ApprovalOperation', title: 'operationxxx', mode: 'edit', operationItem: approvalOperationItem }
const ApprovalOperationForParallelNodes = { component: 'ApprovalOperation', title: 'operationxxx', mode: 'edit', operationItem: approvalOperationItemForParallelNodes }
const ApprovalOperationForStartNode = { component: 'ApprovalOperation', title: 'operationxxx', mode: 'edit', operationItem: approvalOperationItemForStartNode }
const PPApproveLog = { component: 'PPApproveLog', title: 'logxxx', mode: 'readonly' }
export const changeModulesMap = {
  start: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoEdit, ApprovalOperationForStartNode, PPApproveLog]
    }
  },
  business_approve: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ApprovalOperationForParallelNodes, PPApproveLog]
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
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ApprovalOperation, PPApproveLog]
    }
  },
  execute_change_approval: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, ApprovalOperationForParallelNodes, PPApproveLog]
    }
  },
  end: {
    components: {
      dispermission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog],
      permission: [BaseInfoReadonly, ApplyInfoReadonly, PPApproveLog]
    }
  }
}
