<template>
  <div v-if="standardDesc">
    <span>{{ standardDesc }}&nbsp;</span>
    <a  @click="modal.show = true">点击查看标准</a>
    <a-modal
      v-model="modal.show"
      width="1200px"
      title="标准"
      :mask-closable="false"
    >
      <div slot="footer">
        <a-button @click="modal.show = false">关闭</a-button>
      </div>
      <div>{{ standardType }}:</div>
      <div class="__standard-box__" v-html="standardHtml">
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'StandardDesc',
  props: {
    value: {
      type: String,
      default: ''
    },
    dyncInject: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      modal: {
        show: false
      },
      standardDesc: '',
      standardType: '',
      standardHtml: ''
    }
  },
  watch: {
    dyncInject: {
      handler (val) {
        if (val.standardDesc) this.standardDesc = val.standardDesc
        if (val.standardType) this.standardType = val.standardType
        if (val.standardHtml) this.standardHtml = val.standardHtml
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less">
.__standard-box__ table {
  margin: 0 auto;
}
</style>
