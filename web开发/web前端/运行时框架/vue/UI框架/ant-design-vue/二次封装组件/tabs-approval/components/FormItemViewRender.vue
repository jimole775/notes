<template>
  <PPBaseInfo
    :key="'baseInfo'"
    :data-source="dataSource"
    :columns="columns"
  >
    <template slot="odcTypeName">
      {{dataSource['odcTypeName']}} <HelperDesc />
    </template>
    <template slot="standardDesc">
      <StandardDesc :dyncInject="standardDescInjectData" />
    </template>
  </PPBaseInfo>
</template>
<script>
import HelperDesc from './chunks/HelperDesc.vue'
import StandardDesc from './chunks/StandardDesc.vue'
import PPBaseInfo from '@/components/PPBaseInfo.vue'
export default {
  name: 'FormItemViewRender',
  components: { PPBaseInfo, HelperDesc, StandardDesc },
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    requirementTypeOptions () {
      return this.$store.getters.getDictByGroupCode('odc_requirement_type')
    },
    standardDescInjectData () {
      const res = {
        StandardDesc: '',
        odcStandardType: '',
        odcStandardHtml: ''
      }
      this.requirementTypeOptions && this.requirementTypeOptions.forEach((option) => {
        if (this.dataSource['odcType'] === option.itemCode) {
          res.StandardDesc = option.attr1
          res.odcStandardHtml = option.attr4
          res.odcStandardType = option.itemName
        }
      })
      return res
    }
  }
}
</script>
