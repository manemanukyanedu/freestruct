<template lang="pug">
  extends EditBoardBase.pug
  block input
  	input.editable.input-height.input-font(type="text" :placeholder="placeholder" required v-model="initialValue" @input="emit()")

</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
export default {
  name: 'EditBoardInputText',
  extends: EditBoardBase,
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>