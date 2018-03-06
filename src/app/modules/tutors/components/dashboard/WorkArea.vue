<template>
  <div class="work-board">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'WorkArea'
}
</script>
<style scoped lang="less">
  .work-board {
    min-height: 10rem;
    border-top: 1px solid black;
    overflow: hidden;
    padding-bottom: 1rem;
  }
</style>

