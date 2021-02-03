import { FormItemShop } from '../../common/FormItem.shop'
export const formItems = {
  0: {
    baseInfo: [
      FormItemShop.applier,
      FormItemShop.useDepartment,
      FormItemShop.reader
    ],
    applyInfo: [
      FormItemShop.odcType,
      FormItemShop.odcTypeDesc,
      FormItemShop.requirementInfo,
      FormItemShop.useOrganization,
      FormItemShop.projectManager,
      FormItemShop.planApplyDate,
      FormItemShop.planOffshoreCity,
      FormItemShop.currentOffshoreCount,
      FormItemShop.planOffshoreAddCount,
      FormItemShop.otherInfo
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
      FormItemShop.changeType,
      FormItemShop.multiDepartment,
      FormItemShop.changeReason
    ]
  }
}
