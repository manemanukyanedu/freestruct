<template>
  <div>
    <div class="area-conntent">
        <table>
          <thead>
            <tr>
              <th v-for="th in tableHeaders">{{th}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tr, index) in questionList" v-on:click="select($event, index)">
              <td>{{tr.question}}</td>
              <td>{{tr.answersCount}}</td>
              <td><i @click.stop="askForDelete($event, tr.id, tr.question, index)" class="material-icons">clear</i></td>
            </tr>
          </tbody>
        </table>
      </div>
      <confirm-base v-bind="modal" @OkModal="okModal" @CancelModal ="cancelModal" @close="cancelModal"></confirm-base>
  </div>
</template>
<script>
import QuestionService from '@/services/quiz/QuestionService'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Questions',
  data () {
    return {
      modal: {
        name: 'Delete question',
        state: false,
        type: 'confirm',
        closeEvent: 'close',
        question: '',
        res: null,
        rej: null
      },
      tableHeaders: ['Questions', 'Answers Count', 'xxx'],
      questionList: null
    }
  },
  computed: {
    ...mapGetters({
      selectedQuiz: 'QuizzesStore/selectedQuiz',
      accountsId: 'Authenticate/accountsId'
    })
  },
  methods: {
    select (event, index) {
      this.setSelectedQuestion(this.questionList[index])
      this.addToolbarTool({
        name: 'Question Overview',
        selected: false,
        component: 'QuestionOverview',
        subToolbar: []
      })
      this.changeView('QuestionOverview')
      this.$router.push({name: 'QuestionOverview'})
    },
    ...mapActions({
      addPath: 'NavigationStore/addPath',
      addToolbarTool: 'QuizzesStore/addToolbarTool',
      updateToolbar: 'QuizzesStore/updateToolbar',
      setSelectedQuestion: 'QuizzesStore/setSelectedQuestion',
      updateHeader: 'QuizzesStore/updateHeader',
      changeView: 'QuizzesStore/changeView'
    }),
    onLoad (questions) {
      for (var i = questions.length - 1; i >= 0; i--) {
        let answers = this.parseAnswers(questions[i].answers)
        questions[i].answers = answers
        questions[i].answersCount = answers.length
      }
      this.questionList = questions
      console.log(this.questionList)
    },
    parseAnswers (answers) {
      let p = JSON.parse(answers)
      return Object.values(p)
    },
    async loadQuestions () {
      try {
        const response = await QuestionService.index({
          userId: this.accountsId,
          quizId: this.selectedQuiz.id
        })
        if (response && response.data && response.status === 200) {
          this.onLoad(response.data.questions)
        }
      } catch (err) {
        console.log('response.err ', err)
      }
    },
    async askForDelete (e, id, question, index) {
      this.modal.question = question
      this.promise = new Promise((resolve, reject) => {
        this.modal.state = true
        this.modal.res = resolve
        this.modal.rej = reject
      })
      const answer = await this.promise
      if (answer) {
        this.deleteQuestion(id, index)
      }
    },
    async deleteQuestion (id, index) {
      try {
        const response = await QuestionService.deleteQuestion({
          userId: this.accountsId,
          quizId: this.selectedQuiz.id,
          id: id
        })
        if (response.status === 200) {
          this.questionList.splice(index, 1)
        }
        console.log('response.data ', response)
      } catch (err) {
        console.log('response.err ', err)
      }
    },
    okModal () {
      this.modal.state = false
      this.modal.res(true)
    },
    cancelModal () {
      this.modal.state = false
      this.modal.res(false)
    }
  },
  mounted () {
    setTimeout(this.loadQuestions, 100)
  },
  components: {
    'ConfirmBase': () => import('@/modules/base/modals/ConfirmBase')
  }
}
</script>

<style scoped lang="less">
  
</style>
