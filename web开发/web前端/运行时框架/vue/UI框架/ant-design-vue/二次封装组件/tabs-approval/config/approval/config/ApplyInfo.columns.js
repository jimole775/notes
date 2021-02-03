const layout8 = {
  span: 8,
  labelCol: 9,
  wrapperCol: 12
}
const layout16 = {
  span: 16,
  labelCol: 0,
  wrapperCol: 20
}
const layout24 = {
  span: 24,
  labelCol: 3,
  wrapperCol: 20
}
export const applyInfoColumns = {
  0: [
    { ...layout24, key: 'typeName', label: 'xxxxx' },
    { ...layout24, key: 'standardDesc', label: ' ' },
    { ...layout24, key: 'requirementInfo', label: 'xxxxx' },
    { ...layout24, key: 'otherInfo', label: 'xxxxx' }
  ],
  3: [
    { ...layout8, key: 'cityName', label: 'xxxxx' },
    { ...layout8, key: 'odcDetailAddress', label: 'xxxx' },
    { ...layout8, key: 'changeTypeName', label: 'xxxx' },
  ]
}
