<template lang="pug">
  div.edit-board
    div.title(:class="{required: required}" @click="labelClicked") {{name}}
    input.checkbox-input.input-height.input-font(type="checkbox" :id="emiter" v-model="initialChecked")
    label.checkbox-label(:for="emiter")

</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
export default {
  name: 'EditBoardInputCheckbox',
  extends: EditBoardBase,
  data: function () {
    return {
      mutableChecked: this.checked
    }
  },
  watch: {
    'checked': 'updateChecked'
  },
  computed: {
    initialChecked: {
      get: function () {
        return this.mutableChecked
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
    }
  },
  methods: {
    updateChecked () {
      this.mutableChecked = this.checked
    },
    toggled () {
      if (this.eventName !== '') {
        this.$emit(this.eventName, {emiter: this.emiter, value: this.initialChecked})
      }
    },
    labelClicked () {
      this.initialChecked = !this.initialChecked
    }
  }
}
</script>