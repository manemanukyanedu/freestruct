<template>
  <div>
    <div class="area-header">
      <span class="name">{{name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Assesments',
  data () {
    return {
      name: 'Assesments',
      items: [{dashboard: 'Assesments  overview'}]
    }
  }
}
</script>

<style scoped lang="less">
.area-header {
      line-height: 3rem;
      overflow: hidden;
    background-color: white;

        padding: 0 2rem;
      .name {
        float: left;
        font-size: 1.5rem;
        min-width: 60%;
        color: #47906f;
      }
  }
</style>
