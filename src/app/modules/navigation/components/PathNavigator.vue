<template>
    <div class="path">
      <ul>
        <li
          v-for="(item, index) in pathList"  
          v-on:click="select($event, index)">{{ item }}
          <i  v-if="(pathList.length - 1) > index" class="fa">&#xf178;</i></li>
      </ul>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PathNavigator',
  methods: {
    select (event, index) {
      if (this.pathList !== undefined) {
        this.changePath(this.pathList.slice(0, (index + 1)))
      }
    },
    ...mapActions({
      changePath: 'NavigationStore/changePath'
    })
  },
  computed: {
    ...mapGetters({
      pathList: 'NavigationStore/pathList'
    })
  }
}
</script>
<style scoped lang="less">
  .path {
    ul {
        text-align: left;
        list-style: none;
        font-size: .8rem;
        opacity: .7;
        li {
          display: inline-block;
          line-height: 2rem;
          cursor: pointer;
          i {
            font-size: 1.25rem;
            vertical-align: bottom;
            line-height: 2rem;
            display: inline-block;
            margin: 0 .25rem;
          }
        }
      }
  }
</style>
