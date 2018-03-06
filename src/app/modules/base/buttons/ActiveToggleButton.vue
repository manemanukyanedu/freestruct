<template>
  	<button class="btn" @click="emit()"  :class="classList" :disabled="disabled">{{name}}</button>
</template>
<script>
import RegularButton from '@/modules/base/buttons/Button'

export default {
  name: 'ActiveToggleButton',
  extends: RegularButton,
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disabled: function () {
      return !this.active
    }
  }
}
</script>

<style scoped lang="less">

</style>
