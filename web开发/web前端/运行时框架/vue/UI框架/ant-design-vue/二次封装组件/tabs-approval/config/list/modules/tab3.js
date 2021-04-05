export const tab3 = {
  columns: [
    {
      title: 'col1',
      dataIndex: 'key1',
      scopedSlots: { customRender: 'key1' }
    },
    {
      title: 'col2',
      dataIndex: 'key2'
    }
  ],
  searchor: [
    {
      title: 'search1',
      key: 'search1',
      component: 'AInput'
    },
    {
      title: 'search2',
      key: 'search2',
      props: {
        'group-code': 'odc_change_flow_status',
        'value-field': 'itemCode'
      },
      component: 'DictSelect'
    }
  ]
}
