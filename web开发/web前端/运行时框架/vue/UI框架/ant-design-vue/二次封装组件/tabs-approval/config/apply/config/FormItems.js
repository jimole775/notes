import { FormItemShop } from '../../common/FormItem.shop'
export const formItems = {
  0: {
    baseInfo: [
      FormItemShop.applier,
      FormItemShop.applyDepartment,
      FormItemShop.reader
    ],
    applyInfo: [
      FormItemShop.odcType,
      FormItemShop.odcTypeDesc,
      FormItemShop.odcStandardDesc
    ]
  },
  3: {
    baseInfo: [
      FormItemShop.applier,
      FormItemShop.applyDepartment
    ],
    applyInfo: [
      FormItemShop.supplierCode,
      FormItemShop.cityCode,
      FormItemShop.odcDetailAddress
    ]
  }
}
