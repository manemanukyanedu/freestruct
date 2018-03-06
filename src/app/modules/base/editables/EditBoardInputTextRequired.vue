<template lang="pug">
  extends EditBoardBase.pug
  block input
    input.editable.input-height.input-font(type="text" :name="feildName" 
      :placeholder="placeholder" required v-model="initialValue" 
      @input="emit()" v-validate="'required|alpha_spaces'"  @change="emitValidity()"
      :class="{'input': true, 'is-danger': errors.has(feildName) }")
    span.help.is-danger(v-show="errors.has(feildName)") {{ errors.first(feildName) }}

</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
export default {
  name: 'EditBoardInputTextRequired',
  extends: EditBoardBase,
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    feildName: {
      type: String,
      default: ''
    }
  }
}
</script>