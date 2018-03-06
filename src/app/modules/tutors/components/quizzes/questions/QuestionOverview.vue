<template>
  <div>
    <div class="overview">
      <div class="title">{{question.name}}</div>
      <div class="content">{{question.content
      }}</div>
      <div class="answers" v-for="a in answers">
        <div class="answer">
          <span class="correct" :class="{'correct-answer': a.correct}"></span>
          <p class="content">{{a.content}}</p>
        </div>  
      </div>
    </div>
    <div class="btn-hld" slot="buttons">
      <regular-button v-bind="buttons.remove"  @remove="askForDelete"></regular-button>
      <regular-button v-bind="buttons.edit" @edit="edit"></regular-button>
    </div>
    <confirm-base v-bind="modal" @OkModal="okModal" @CancelModal ="cancelModal" @close="cancelModal"></confirm-base>
  </div>
</template>
<script>
import QuestionService from '@/services/quiz/QuestionService'
import RegularButton from '@/modules/base/buttons/Button'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'QuestionOverview',
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
      question: {
        name: 'Question',
        content: ''
      },
      answers: [],
      buttons: {
        remove: {name: 'Remove', active: true, classes: ['left'], eventName: 'remove'},
        edit: {name: 'Edit', active: false, classes: ['right'], eventName: 'edit'}
      },
      promise: null,
      toolExtracted: false
    }
  },
  computed: {
    ...mapGetters({
      selectedQuiz: 'QuizzesStore/selectedQuiz',
      selectedQuestion: 'QuizzesStore/selectedQuestion',
      accountsId: 'Authenticate/accountsId',
      selectedView: 'QuizzesStore/selectedView'
    })
  },
  methods: {
    ...mapActions({
      setActiveTool: 'QuizzesStore/setActiveTool',
      setQuestionMode: 'QuizzesStore/setQuestionMode',
      addToolbarTool: 'QuizzesStore/addToolbarTool',
      changeView: 'QuizzesStore/changeView',
      removeToolbarTool: 'QuizzesStore/removeToolbarTool'
    }),
    edit () {
      this.setQuestionMode('edit')
      this.removeToolbarTool({
        name: 'Question Overview'
      })
      this.addToolbarTool({
        name: 'Edit Question',
        selected: false,
        component: 'EditQuestion',
        subToolbar: []
      })
      this.changeView('EditQuestion')
      this.$router.push({name: 'EditQuestion'})
    },
    addAnswer (answer, correct) {
      this.answers.push({
        content: answer,
        correct: correct
      })
    },
    async askForDelete (e, title, index) {
      this.modal.name = ''
      this.modal.question = 'Delete question?'
      this.promise = new Promise((resolve, reject) => {
        this.modal.state = true
        this.modal.res = resolve
        this.modal.rej = reject
      })
      const answer = await this.promise
      if (answer) {
        this.deleteQuestion()
      }
    },
    async deleteQuestion () {
      try {
        const response = await QuestionService.deleteQuestion({
          userId: this.accountsId,
          quizId: this.selectedQuiz.id,
          id: this.selectedQuestion.id
        })
        if (response.status === 200) {
          this.removeToolbarTool({
            name: 'Question Overview',
            component: 'QuestionOverview'
          })
          this.changeView('QuestionsList')
          this.setActiveTool('Questions')
          this.toolExtracted = true
          this.$router.push({name: 'QuestionsList'})
        }
        console.log('response.data ', response)
      } catch (err) {
        console.log('response.err ', err)
      }
    },
    init () {
      this.question.content = this.selectedQuestion.question
      for (let i = this.selectedQuestion.answers.length - 1; i >= 0; i--) {
        this.addAnswer((this.selectedQuestion.answers[i]).content, (this.selectedQuestion.answers[i]).correct)
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
  created () {
    this.init()
  },
  components: {
    RegularButton,
    'ConfirmBase': () => import('@/modules/base/modals/ConfirmBase')
  },
  beforeRouteLeave (to, from, next) {
    if (!this.toolExtracted) {
      this.removeToolbarTool({
        name: 'Question Overview',
        component: 'QuestionOverview'
      })
      this.toolExtracted = true
      next()
    } else {
      next()
    }
  }
}
</script>
<style scoped lang="less">

</style>
