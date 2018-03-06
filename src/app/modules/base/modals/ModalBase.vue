<template lang="pug">
  include ModalBase.pug
</template>
<script>

export default {
  name: 'ModalBase',
  props: {
    state: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    closeEvent: {
      type: String,
      default: ''
    }
  },
  methods: {
    close () {
      if (this.closeEvent !== '') {
        this.$emit(this.closeEvent)
      }
    }
  }
}
</script>

<style scoped lang="less">
  
</style>
