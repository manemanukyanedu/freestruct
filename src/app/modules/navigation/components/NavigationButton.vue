<template>
  <button class="navigation-btn" @click="clicked()">{{name}}</button>
</template>
<script>

export default {
  name: 'NavigationButton',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    clicked () {
      this.$emit('clicked')
    }
  }
}
</script>

<style scoped lang="less">
  
</style>
