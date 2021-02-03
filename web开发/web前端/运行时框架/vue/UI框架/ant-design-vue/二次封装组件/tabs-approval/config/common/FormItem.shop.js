const layout24 = {
  span: 24,
  label: 3,
  wrapper: 20
}
const layout8 = {
  span: 8,
  label: 9,
  wrapper: 12
}

export const FormItemShop = {
  applier: {
    layout: layout8,
    label: '申请人',
    key: 'applier',
    default: true,
    value: '',
    paramKeys: ['applyAccount', 'applyName'],
    permissions: [],
    mode: 'readonly',
    component: 'span'
  },
  odcTypeDesc: {
    layout: {
      span: 16,
      label: 0,
      wrapper: 20
    },
    label: ' ',
    key: 'typeDesc',
    default: false,
    value: '',
    permissions: [],
    component: 'TypeDesc'
  },
  odcStandardDesc: {
    layout: {
      span: 24,
      label: 3,
      wrapper: 21
    },
    dyncInject: {
    },
    depend: 'typeDesc',
    label: ' ',
    key: 'standardDesc',
    default: false,
    value: '',
    permissions: [],
    component: 'StandardDesc'
  },
  reader: {
    layout: layout8,
    label: '读者',
    key: 'reader',
    default: false,
    paramKeys: ['readerAccount', 'readerName'],
    permissions: [],
    component: 'UserSelect'
  },
  dictSelect: {
    layout: layout8,
    props: {
      'group-code': 'odc_change_type',
      'value-field': 'itemCode'
    },
    label: '字典类型',
    key: 'dictSelect',
    default: false,
    value: null,
    required: true,
    permissions: [],
    component: 'DictSelect'
  },
  radioSelect: {
    layout: {
      span: 12,
      label: 6,
      wrapper: 18
    },
    label: '单选框',
    key: 'radioSelect',
    default: false,
    value: null,
    required: true,
    permissions: [],
    mode: 'edit',
    component: 'ARadioGroup'
  },
  changeReason: {
    layout: layout24,
    props: {
      rows: 4
    },
    label: '原因说明',
    key: 'changeReason',
    default: false,
    value: '',
    required: true,
    permissions: [],
    mode: 'edit',
    component: 'ATextarea'
  }
}
