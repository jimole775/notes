export const approvalOperationItem = {
  radios: [
    { label: 'pass', value: '1', key: 'approvalResult', title: '', component: 'ARadio' },
    { label: 'close', value: '3', key: 'approvalResult', title: '', component: 'ARadio' },
    { label: 'reject', value: '2', key: 'approvalResult', title: '', component: 'ARadio' },
    { label: 'transform', value: '8', key: 'approvalResult', title: '', component: 'ARadio' }
  ],
  inputs: [
    {
      label: 'target',
      dedfault: '',
      key: 'transfer',
      component: 'UserSelect',
      paramKeys: ['transferAccount', 'transferName'],
      permissions: ['8'],
      required: true
    },
    {
      label: 'commont',
      dedfault: '',
      key: 'approvalContent',
      component: 'ATextarea',
      permissions: ['1', '2', '3'],
      required: true
    }
  ]
}

// 开始节点，只需要填写“审批意见”
export const approvalOperationItemForStartNode = {
  inputs: [
    {
      label: 'commont',
      dedfault: '',
      key: 'approvalContent',
      component: 'ATextarea',
      permissions: ['1', '2', '3'],
      required: true
    }
  ]
}

// 会签类型的节点，不需要“不通过”项
export const approvalOperationItemForParallelNodes = {
  radios: [
    { label: 'pass', value: '1', key: 'approvalResult', title: '', component: 'ARadio' },
    { label: 'reject', value: '2', key: 'approvalResult', title: '', component: 'ARadio' },
    { label: 'transform', value: '8', key: 'approvalResult', title: '', component: 'ARadio' }
  ],
  inputs: [
    {
      label: 'target',
      dedfault: '',
      key: 'transfer',
      component: 'UserSelect',
      paramKeys: ['transferAccount', 'transferName'],
      permissions: ['8'],
      required: true
    },
    {
      label: 'commont',
      dedfault: '',
      key: 'approvalContent',
      component: 'ATextarea',
      permissions: ['1', '2'],
      required: true
    }
  ]
}
