<template>
  <div class="board">
    <work-area></work-area>
  </div>
</template>

<script>
import WorkArea from './dashboard/WorkArea'
import { mapActions } from 'vuex'

export default {
  name: 'Tutors',
  components: {
    WorkArea
  },
  methods: {
    ...mapActions({
      addPath: 'NavigationStore/addPath'
    })
  },
  created: function () {
    this.addPath({ name: 'Tutors', position: 1 })
  }
}
</script>

<style scoped lang="less">
  
</style>
