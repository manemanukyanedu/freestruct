<template>
  <div class="free-struct">
    <div class="pres">
      <slot name="navbar"></slot>
    </div>
    <div class="views">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'free-struct',
  methods: {
    ...mapActions({
      checkAuthenticateState: 'Authenticate/checkAuthenticateState'
    })
  },
  created: function () {
    this.checkAuthenticateState()
  }
}
</script>

<style lang="less">
  @import './assets/less/whole.less';
</style>
