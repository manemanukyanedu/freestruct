<template>
    <div class="area-header">
      <span class="name">{{boardHeader.name}}</span>
      <!-- <span class="create" v-if="operationIsValid"  v-on:click="exec()">{{boardHeader.operation.name}}</span> -->
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BoardHeader',
  computed: {
    operationIsValid () {
      return this.boardHeader.operation.name !== undefined
    },
    ...mapGetters({
      boardHeader: 'QuizzesStore/boardHeader'
    })
  },
  methods: {
    exec () {
      if (this.operationIsValid) {
        this.$router.push({name: this.boardHeader.operation.component})
        this.addPath({ name: this.boardHeader.operation.name, position: 5 })
      }
    },
    ...mapActions({
      addPath: 'NavigationStore/addPath'
    })
  }
}
</script>

<style scoped lang="less">

</style>
