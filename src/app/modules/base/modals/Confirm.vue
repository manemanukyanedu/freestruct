<template>
  <div>
    <div class="confirm">
      <div class="title">
        <span class="d-title">{{name}}</span>
        <span class="message">{{content}}</span>
      </div>
    </div>
    <div class="btn-hld" slot="buttons">
      <regular-button v-bind="buttons.cancel"  @cancel="cancel()"></regular-button>
      <regular-button v-bind="buttons.ok"  @ok="ok()"></regular-button>
    </div>
  </div>
</template>
<script>
import RegularButton from '@/modules/base/buttons/Button'
export default {
  name: 'Confirm',
  data () {
    return {
      buttons: {
        cancel: {name: 'Cancel', active: true, classes: [], eventName: 'cancel'},
        ok: {name: 'Ok', active: true, classes: [], eventName: 'ok'}
      }
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    content: {
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