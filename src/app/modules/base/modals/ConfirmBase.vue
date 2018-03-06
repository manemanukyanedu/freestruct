<template lang="pug">
  extends ModalBase.pug
  block input
    div.confirm
      div.title
        span.d-title {{name}}
      span.message {{question}}
    <div class="btn-hld" slot="buttons">
      <regular-button v-bind="buttons.cancel"  @cancel="cancel()"></regular-button>
      <regular-button v-bind="buttons.ok"  @ok="ok()"></regular-button>
    </div>
</template>
<script>
import RegularButton from '@/modules/base/buttons/Button'
import ModalBase from './ModalBase.vue'
export default {
  name: 'ConfirmBase',
  extends: ModalBase,
  data () {
    return {
      buttons: {
        cancel: {name: 'Cancel', active: true, classes: [], eventName: 'cancel'},
        ok: {name: 'Ok', active: true, classes: [], eventName: 'ok'}
      },
      promise: null
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    question: {
      type: String,
      default: ''
    }
  },
  methods: {
    cancel () {
      this.$emit('CancelModal')
    },
    ok () {
      this.$emit('OkModal')
    }
  },
  components: {
    RegularButton
  }
}
</script>