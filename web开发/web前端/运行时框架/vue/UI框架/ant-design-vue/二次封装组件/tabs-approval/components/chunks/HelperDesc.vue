<template>
  <span>（点击查看帮助文档：<a :href="helperAddress" target="_blank">点此打开</a>）</span>
</template>
<script>
export default {
  name: 'HelperDesc',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    helperAddress () {
      return process.env.VUE_APP_ODC_URL
    }
  },
  methods: {
  }
}
</script>
