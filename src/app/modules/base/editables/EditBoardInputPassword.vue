<template lang="pug">
  extends EditBoardBase.pug
  block input
    input.editable.input-height.input-font(type="password" :name="feildName" autocomplete="new-password"
      :placeholder="placeholder" required v-model="initialValue" @input="emit()" @change="emitValidity()"
      v-validate="{ required: true, regex: /^[a-zA-Z0-9]{8,32}/ }")
    span.help.is-danger(v-show="errors.has(feildName)") {{ errors.first(feildName) }} {{message}}
      
</template>
<script>
import EditBoardBase from './EditBoardBase.vue'
export default {
  name: 'EditBoardInputPassword',
  extends: EditBoardBase,
  data () {
    return {
      message: 'It should be min 8 charecters in length, max 32 charecters in length.'
    }
  },
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