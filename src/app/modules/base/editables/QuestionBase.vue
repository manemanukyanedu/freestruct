<template lang="pug">
  extends EditBoardBase.pug
  block input
    input.checkbox-input.input-height.input-font(type="checkbox" :id="toggle" v-model="initialChecked")
    label.checkbox-label(:for="toggle")
    textarea.editable.textarea.input-font(v-model="initialValue" @input="emit()")
</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
export default {
  name: 'QuestionBase',
  extends: EditBoardBase,
  data: function () {
    return {
      mutableChecked: this.checked
    }
  },
  computed: {
    initialChecked: {
      get: function () {
        return this.checked
      },
      set: function (newValue) {
        this.mutableChecked = newValue
        this.toggled()
      }
    }
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: String,
      default: 'any'
    }
  },
  methods: {
    toggled () {
      console.log('emit')
      if (this.eventName !== '') {
        this.$emit(this.eventName, {emiter: this.emiter, value: this.mutableChecked})
      }
    }
  }
}
</script>