<template lang="pug">
  extends ModalBase.pug
  block input
    div.title
      span.d-title {{name}}
      span.message {{message}}
    span.details(v-for="item in details") {{item}}
</template>

<script>
import ModalBase from './ModalBase'
export default {
  name: 'ErrorModal',
  extends: ModalBase,
  props: {
    name: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    details: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>