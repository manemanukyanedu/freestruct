<template>
   <div class="toolbar">
      <ul>
        <li v-for="(item, index) in toolbar"
            v-on:click="select($event, index)"
            v-bind:class="{ selected: item.selected}">
            <span>{{item.name}}</span>
            <ul v-if="item.subToolbar.length">
              <li v-for="(sub, i) in item.subToolbar"
                v-bind:class="{ selected: sub.selected}"
                v-on:click="subSelect($event, index, i)">
                <span>{{ sub.name }}</span>
              </li>
            </ul>
        </li>
      </ul>
   </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Toolbar',
  computed: {
    ...mapGetters({
      toolbar: 'QuizzesStore/toolbar'
    })
  },
  methods: {
    ...mapActions({
      addPath: 'NavigationStore/addPath',
      changeView: 'QuizzesStore/changeView'
    }),
    select (event, index) {
      for (let i = this.toolbar.length - 1; i >= 0; i--) {
        if (i !== index) {
          this.toolbar[i].selected = false
        }
      }
      this.toolbar[index].selected = true
      this.changeView(this.toolbar[index].component)
    },
    subSelect (event, index, k) {
      for (let i = this.toolbar[index].subToolbar.length - 1; i >= 0; i--) {
        if (i !== k) {
          this.toolbar[index].subToolbar[i].selected = false
        }
      }
      this.toolbar[index].subToolbar[k].selected = true
    }
  },
  created () {
    for (let i = this.toolbar.length - 1; i >= 0; i--) {
      if (this.toolbar[i].selected) {
        this.changeView(this.toolbar[i].component)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
