<template lang="pug">
  extends EditBoardBase.pug
  block input
  	v-select.input-font(name="language" v-model="initialValue" :options="options"  @input="emit()")

</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
import vSelect from 'vue-select'
export default {
  name: 'EditBoardTextarea',
  extends: EditBoardBase,
  props: {
    options: Array,
    default: function () {
      return []
    }
  },
  components: {
    vSelect
  }
}
</script>