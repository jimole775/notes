<template>
  <div>
    <STable
      :ref="'STableRef'"
      :columns="columns"
      :searchor="searchor"
      :row-key="'flowInstanceId'"
      :data-dict="'records'"
      :data-api="apimap.list"
      :export-api="apimap.export"
      :revoke-api="apimap.revoke"
      :close-api="apimap.close"
      :is-pagination="true"
      @update="updateDataSet"
      @selectChange="selectChange"
    >
      <template slot="summary">
        <a-button
          ghost
          type="primary"
          @click="projectApply"
        >
          申请
        </a-button>
      </template>
      <template slot="flowNo" slot-scope="record">
        <a @click="projectApproval(record)">{{ record.flowNo }}</a>
      </template>
    </STable>
  </div>
</template>
<script>
// import api from '@/api'
import moment from 'moment'
import STable from '@/components/STable'
import utils from '@/utils'
import baseMixins from '@/mixins/baseMixins.js'

export default {
  components: {
    STable
  },
  mixins: [baseMixins],
  props: {
    listConfig: {
      type: Object,
      required: true
    },
    apimap: {
      type: Object,
      required: true
    },
    transferSearchor: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      dataList: [],
      selectRows: []
    }
  },
  computed: {
    searchor () {
      return this.transferSearchor(this.listConfig.searchor || [])
    },
    columns () {
      return this.listConfig.columns || []
    }
  },
  methods: {
    moment,
    formatMoney: utils.formatMoney,
    projectApproval (record) {
      this.$emit('addDetailTab', '2', record)
    },
    projectApply () {
      this.$emit('addDetailTab', '1')
    },
    selectChange (selectKeys, selectRows) {
      this.selectRows = selectRows
    },
    updateDataSet (val) {
      this.selectRows = []
      this.dataList = val
    },
    async reload () {
      await this.$refs.STableRef
      this.$refs.STableRef.reload()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
