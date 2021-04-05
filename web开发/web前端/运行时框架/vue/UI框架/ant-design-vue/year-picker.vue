<template>
  <a-date-picker
    v-model="value"
    mode="year"
    format="YYYY"
    :default-value="value"
    :open="yearPickShow"
    @panelChange="panelChange"
    @openChange="openChange"
  />
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      yearPickShow: false
    }
  },
  methods: {
    panelChange (val) {
      this.value = val
      this.yearPickShow = false
      this.$emit('input', val)
      console.log('panelChange:', val)
    },
    openChange (val) {
      this.yearPickShow = val
      console.log('openChange:', val)
    }
  }
}
</script>
<style lang="less">

</style>
