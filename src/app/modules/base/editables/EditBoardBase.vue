<template lang="pug">
  include EditBoardBase.pug
</template>
<script>

export default {
  name: 'EditBoardBase',
  data: function () {
    return {
      inputValue: this.value
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    },
    eventName: {
      type: String,
      default: ''
    },
    emiter: {
      type: String,
      default: ''
    }
  },
  computed: {
    initialValue: {
      get: function () {
        return this.value
      },
      set: function (newValue) {
        this.inputValue = newValue
      }
    }
  },
  methods: {
    emit () {
      console.log('emit ', this.eventName)
      if (this.eventName !== '') {
        this.$emit(this.eventName, {emiter: this.emiter, value: this.inputValue})
      }
    },
    clicked () {
      console.log('clicked')
      this.$emit('clicked')
    },
    emitValidity () {
      if (this.$validator.errors.items[0] === undefined) {
        this.$emit('validity', {emiter: this.emiter, value: true})
      } else {
        this.$emit('validity', {emiter: this.emiter, value: false})
      }
    }
  }
}
</script>

<style scoped lang="less">
  
</style>
