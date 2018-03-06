<template>
   <div class="edit-board">
        <div class="title " :class="{required: required}">{{name}}</div>
        <input class="editable input-height input-font" v-model="initialValue" @input="emit()"
              type="text" name="title" :placeholder="placeholder" required>
       <slot name="buttons"></slot>
      </div>
</template>
<script>

export default {
  name: 'EditBoard',
  data: function () {
    return {
      inputValue: this.value
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
  props: {
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    eventName: {
      type: String,
      default: ''
    }
  },
  methods: {
    emit () {
      if (this.eventName !== '') {
        this.$emit(this.eventName, this.inputValue)
      }
    }
  }
}
</script>

<style scoped lang="less">
  
</style>
