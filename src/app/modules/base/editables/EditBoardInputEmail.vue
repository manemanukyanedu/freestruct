<template lang="pug">
  extends EditBoardBase.pug
  block input
  	input.editable.input-height.input-font(type="text"  @change="emitValidity()"
      :placeholder="placeholder" v-model="initialValue" @input="emit()")

</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
export default {
  name: 'EditBoardInputEmail',
  extends: EditBoardBase,
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>