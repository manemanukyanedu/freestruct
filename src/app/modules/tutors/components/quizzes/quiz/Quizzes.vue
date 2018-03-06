<template>
  <div>
    <router-view name="header"></router-view>
    <router-view name="toolbar"></router-view>
    <router-view name="board"></router-view>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Quizzes',
  data () {
    return {
      boardHeader: {
        name: 'Quizzes',
        operation: {name: 'New', component: 'QuizCreate'}
      },
      tools: [
        {
          name: 'Quizzes',
          selected: true,
          component: 'QuizList',
          subToolbar: []
        },
        {
          name: 'New Quiz',
          selected: false,
          component: 'QuizCreate',
          subToolbar: []
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      selectedView: 'QuizzesStore/selectedView'
    })
  },
  watch: {
    'selectedView': 'selectView'
  },
  methods: {
    selectView () {
      this.$router.push({name: this.selectedView})
    },
    ...mapActions({
      updateToolbar: 'QuizzesStore/updateToolbar',
      updateHeader: 'QuizzesStore/updateHeader'
    })
  },
  created: function () {
    this.updateHeader(this.boardHeader)
    this.updateToolbar(this.tools)
    this.$router.replace({path: this.$router.currentRoute.fullPath + ''})
  },
  mounted: function () {
    this.$router.replace({name: this.selectedView})
  }
}
</script>

<style scoped lang="less">
   
</style>
