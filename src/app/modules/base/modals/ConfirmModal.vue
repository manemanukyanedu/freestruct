<template lang="pug">
  extends ModalBase.pug
  block input
  	

</template>
<script>
import ConfirmBase from './ConfirmBase'
export default {
  name: 'ConfirmModal',
  extends: ConfirmBase,
  props: {
    question: {
      type: String,
      default: ''
    }
  }
}
</script>