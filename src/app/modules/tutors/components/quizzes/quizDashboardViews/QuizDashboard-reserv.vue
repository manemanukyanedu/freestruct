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
  name: 'QuizDashboard',
  data () {
    return {
      boardHeader: {
        name: 'Quiz dashboard',
        operation: {name: 'Play', component: ''}
      },
      tools: [
        {
          name: 'Quiz Dashboard',
          selected: true,
          component: 'About',
          subToolbar: []
        },
        {
          name: 'Questions',
          selected: false,
          component: 'Questions',
          subToolbar: [{name: 'Import Questions', selected: false}, {name: 'Export Questions', selected: false}, {name: 'New Question', selected: false}]
        },
        {
          name: 'Settings',
          selected: false,
          component: 'Settings',
          subToolbar: []
        }
      ]
    }
  },
  watch: {
    'selectedView': 'selectView'
  },
  computed: {
    ...mapGetters({
      quizId: 'QuizzesStore/quizId',
      selectedView: 'QuizzesStore/selectedView'
    })
  },
  methods: {
    selectView () {
      this.$router.push({name: this.selectedView})
      this.addPath({name: this.selectedView, position: 5})
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

<style scoped lang="less">
  .info-board {
    padding: 1rem 0;
    margin: .25rem 0;
    background-color: #fafeffb5;
    .entries {
      line-height: 3rem;
      text-align: left;
      font-size: 1.1rem;
      font-style: oblique;
      padding: 0 1rem;
      color: #47906f;
      &:nth-child(even){
        background-color: #196b5447;
      }
      span {
        float: right;
        width: 70%;
        color: #166b86;
        font-style: normal;
      }
    }
  }
</style>
