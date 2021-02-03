<template>
  <div class="moveBox">
    <OmsTabsPlus :ref="'OmsTabsRef'" :tab-proxy="tabProxy" />
    <div v-if="tabProxy.showList">
      <ProjectList
        :key="new Date().getTime()"
        :ref="'ProjectListRef'"
        :transfer-searchor="transferSearchor"
        :apimap="apimap"
        :list-config="listConfig"
        @addDetailTab="addDetailTab"
      />
    </div>
    <div v-if="tabProxy.showApply">
      <ProjectApply
        :key="new Date().getTime()"
        :apply-modules-map="applyModulesMap"
        :apimap="apimap"
        :tab-proxy="tabProxy"
        @close="removePane()"
      />
    </div>
    <div v-if="tabProxy.showDetail">
      <ProjectApproval
        :key="new Date().getTime()"
        :apply-modules-map="applyModulesMap"
        :approval-modules-map="approvalModulesMap"
        :tab-proxy="tabProxy"
        :apimap="apimap"
        @close="removePane()"
      />
    </div>
  </div>
</template>
<script>
// import api from '@/api'
import OmsTabsPlus from '@/components/OmsTabsPlus'
import baseMixins from '@/mixins/baseMixins'
import todoMixins from '@/mixins/todoMixins'
import ProjectList from './list'
import ProjectApply from './apply'
import ProjectApproval from './approval'
import { listConfig } from './config/list/listConfig.map'
import { apimap } from './config/common/api.map'
import { applyModulesMap } from './config/apply/modules.map'
import { approvalModulesMap } from './config/approval/modules.map'
export default {
  components: {
    OmsTabsPlus,
    ProjectList,
    ProjectApply,
    ProjectApproval
  },
  mixins: [baseMixins, todoMixins],
  data () {
    return {
      tabProxy: {
        panes: [
          {
            tabName: 'tab0列表页面',
            proxyName: { apply: 'tab0申请页面', detail: 'tab0审批页面' },
            type: 'list',
            tabId: '0',
            closable: false,
            visible: false,
            show: false,
            permission: {
              roles: [],
              config: apimap[0]['viewable']
            }
          },
          { tabId: '1', ...other_attrs },
          { tabId: '2', ...other_attrs },
          {
            tabName: 'tab3列表页面',
            proxyName: { apply: 'tab3申请页面', detail: 'tab3审批页面' },
            type: 'list',
            tabId: '3',
            closable: false,
            show: false,
            permission: {
              roles: [],
              config: apimap[3]['viewable']
            }
          }
        ],
        showList: true,
        showApply: false,
        showDetail: false,
        activeId: '0',
        lastListId: '0'
      }
    }
  },
  computed: {
    applyModulesMap () {
      return applyModulesMap[this.tabProxy.lastListId]
    },
    approvalModulesMap () {
      return approvalModulesMap[this.tabProxy.lastListId]
    },
    apimap () {
      return apimap[this.tabProxy.lastListId]
    },
    listConfig () {
      return listConfig[this.tabProxy.lastListId]
    }
  },
  methods: {
    async addDetailTab (typeId, recordData) {
      await this.$refs.OmsTabsRef
      this.$refs.OmsTabsRef.addDetailTab(typeId, recordData)
    },
    async removePane () {
      await this.$refs.OmsTabsRef
      this.$refs.OmsTabsRef.removePane(this.tabProxy.activeId)
      this.reload()
    },
    async reload () {
      await this.$refs.ProjectListRef
      this.$refs.ProjectListRef.reload()
    }
  }
}
</script>
