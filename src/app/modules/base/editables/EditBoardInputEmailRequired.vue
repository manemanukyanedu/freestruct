<template lang="pug">
  extends EditBoardBase.pug
  block input
    input.editable.input-height.input-font(type="text" name="email"
      :placeholder="placeholder" required v-model="initialValue"  @change="emitValidity()"
      @input="emit()" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }") 
    span.help.is-danger(v-show="errors.has('email')") {{ errors.first('email') }}
</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
export default {
  name: 'EditBoardInputEmailRequired',
  extends: EditBoardBase,
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>