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
  name: 'Quiz',
  data () {
    return {
      boardHeader: {
        name: 'Quiz'
      },
      tools: [
        {
          name: 'Quizzes',
          selected: false,
          component: 'Quizzes',
          subToolbar: []
        },
        {
          name: 'About',
          selected: true,
          component: 'QuizAbout',
          subToolbar: []
        },
        {
          name: 'Questions',
          selected: false,
          component: 'QuestionsList',
          subToolbar: []
        },
        {
          name: 'Settings',
          selected: false,
          component: 'QuizSettings',
          subToolbar: []
        },
        {
          name: 'Import Questions',
          selected: false,
          component: 'ImportQuestions',
          subToolbar: []
        },
        {
          name: 'Export Questions',
          selected: false,
          component: 'ExportQuestions',
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
      addPath: 'NavigationStore/addPath',
      setQuizId: 'QuizzesStore/setQuizId',
      updateToolbar: 'QuizzesStore/updateToolbar',
      updateHeader: 'QuizzesStore/updateHeader'
    })
  },
  created: function () {
    this.updateHeader(this.boardHeader)
    this.updateToolbar(this.tools)
    this.$router.replace({path: this.$router.currentRoute.fullPath + ''})
  }
}
</script>

<style scoped lang="less"></style>
