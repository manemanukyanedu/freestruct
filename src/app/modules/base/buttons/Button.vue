<template>
  <button class="btn" @click="emit()" :class="classList">{{name}}</button>
</template>
<script>

export default {
  name: 'RegularButton',
  props: {
    name: {
      type: String,
      required: true
    },
    classes: {
      type: Array,
      default: function () {
        return []
      }
    },
    eventName: {
      type: String,
      default: ''
    }
  },
  computed: {
    classList: function () {
      return this.classes.join(' ')
    }
  },
  methods: {
    emit () {
      console.log('emit')
      if (this.eventName !== '') {
        this.$emit(this.eventName)
      }
    }
  }
}
</script>

<style scoped lang="less">
  
</style>
