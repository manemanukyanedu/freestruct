<template>
  <div class="info-board">
        <div class="entries">Quiz title  <span>{{quiz.title}}</span> </div>
        <div class="entries">URL <span>{{quiz.url}}</span></div>
        <div class="entries">Number of questions  <span>{{quiz.questionsCount}}</span></div>
        <div class="entries">Play time  <span>{{quiz.passingCount}}</span></div>
      </div>
</template>
<script>
import QuizService from '@/services/quiz/QuizService'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'QuizAbout',
  data () {
    return {
      quiz: {
        title: '',
        url: '',
        questionsCount: 0,
        passingCount: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      accountsId: 'Authenticate/accountsId',
      quizId: 'QuizzesStore/quizId',
      selectedQuiz: 'QuizzesStore/selectedQuiz'
    })
  },
  methods: {
    ...mapActions({
      setSelectedQuiz: 'QuizzesStore/setSelectedQuiz'
    }),
    onLoad (quiz) {
      this.quiz = quiz
      this.setSelectedQuiz(quiz)
    },
    async loadQuiz () {
      try {
        const response = await QuizService.getQuiz({
          userId: this.accountsId,
          id: this.quizId
        })
        if (response && response.data && response.status === 200) {
          this.onLoad(response.data.quiz)
        }
      } catch (err) {
        console.log('response.err ', err)
      }
    }
  },
  async mounted () {
    setTimeout(this.loadQuiz, 100)
  }
}
</script>

<style scoped lang="less">
  
</style>
