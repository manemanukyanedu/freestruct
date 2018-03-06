<template lang="pug">
  extends EditBoardBase.pug
  block input
  	textarea.editable.textarea.input-font(name="desc" v-model="initialValue" @input="emit()")

</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
export default {
  name: 'EditBoardTextarea',
  extends: EditBoardBase
}
</script>