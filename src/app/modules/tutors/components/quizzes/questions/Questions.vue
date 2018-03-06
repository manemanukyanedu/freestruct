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
  name: 'Questions',
  data () {
    return {
      boardHeader: {
        name: 'Questions'
      },
      tools: [
        {
          name: 'Quiz',
          selected: false,
          component: 'Quiz',
          subToolbar: []
        },
        {
          name: 'Questions',
          selected: true,
          component: 'QuestionsList',
          subToolbar: []
        },
        {
          name: 'New Question',
          selected: false,
          component: 'CreateQuestions',
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
  }
}
</script>

