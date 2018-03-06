<template>
  <div>
    <div >
      <edit-board-textarea class="seperated" v-bind="question" @question="editTextarea($event)"></edit-board-textarea>
      <div v-for="(a, index) in answers">
        <div class="lefted-hld">
          <i @click="checkForDelete($event, a.answer.name, index)" class="material-icons lefted">clear</i>
        </div>
        <edit-board-textarea v-bind="a.answer" @answer="editTextarea($event, index)"></edit-board-textarea>
        <edit-board-input-checkbox class="seperated lifted" v-bind="a.correct" @toggled="toggledCheckbox($event, index)"></edit-board-input-checkbox>
      </div>
      <div class="btn-hld seperated" slot="buttons">
          <active-toggle-button v-bind="buttons.addAnswer"  @addAnswer="addAnswer()"></active-toggle-button>
      </div>
      <div class="btn-hld" slot="buttons">
          <regular-button v-bind="buttons.cancel"  @cancel="cancel()"></regular-button>
          <active-toggle-button v-bind="buttons.save" class="right" @save="save()"></active-toggle-button>
        </div>
      <confirm-base v-bind="modal" @OkModal="okModal" @CancelModal ="cancelModal" @close ="cancelModal"></confirm-base>
      <info-modal v-bind="modalInfo" @close ="hideInfo"></info-modal>
    </div>
  </div>
</template>
<script>
import RegularButton from '@/modules/base/buttons/Button'
import ActiveToggleButton from '@/modules/base/buttons/ActiveToggleButton'
import EditBoardTextarea from '@/modules/base/editables/EditBoardTextarea'
import EditBoardInputCheckbox from '@/modules/base/editables/EditBoardInputCheckbox'
import { mapGetters, mapActions } from 'vuex'
import QuestionService from '@/services/quiz/QuestionService'
import Guid from '@/utils/Guid.js'
import Constants from '@/modules/tutors/api/constants'
export default {
  name: 'NewQuestion',
  data () {
    return {
      modal: {
        name: 'Before Leave',
        state: false,
        type: 'confirm',
        closeEvent: 'close',
        question: 'You have changes in this page, do you want to leave the page without saving them?',
        res: null,
        rej: null
      },
      modalInfo: {
        name: 'Info',
        state: false,
        type: 'info',
        closeEvent: 'close',
        message: '',
        details: []
      },
      question: {
        name: 'Question',
        required: true,
        placeholder: 'Question',
        value: '',
        eventName: 'question'
      },
      answers: [],
      buttons: {
        addAnswer: {name: 'Add answer', active: true, classes: [], eventName: 'addAnswer'},
        cancel: {name: 'Cancel', active: true, classes: ['left'], eventName: 'cancel'},
        save: {name: 'Save', active: false, classes: [], eventName: 'save'}
      },
      promise: null,
      saved: false
    }
  },
  computed: {
    ...mapGetters({
      selectedQuiz: 'QuizzesStore/selectedQuiz',
      fixToolbarPosition: 'QuizzesStore/fixToolbarPosition',
      accountsId: 'Authenticate/accountsId',
      selectedView: 'QuizzesStore/selectedView'
    })
  },
  methods: {
    ...mapActions({
      recoverToolbarPosition: 'QuizzesStore/recoverToolbarPosition',
      changeView: 'QuizzesStore/changeView'
    }),
    validateQuestion () {
      if (this.question.value.trim() === '') {
        this.modalInfo.message = ' The question is not specified.'
        this.modalInfo.details = []
        this.showMessage()
        return false
      } else {
        return true
      }
    },
    validate () {
      return (this.validateQuestion() && this.validateAnswers())
    },
    validateAnswers () {
      let filled = 0
      let correct = 0
      for (var i = this.answers.length - 1; i >= 0; i--) {
        if (this.answers[i].answer.value.trim() !== '') {
          ++filled
        }
        if (this.answers[i].correct.checked) {
          ++correct
        }
      }
      if (filled < 2) {
        this.modalInfo.message = 'Too few corrects.'
        this.modalInfo.details = ['The question must have at least two answers.']
        this.showMessage()
        return false
      } else if (filled < this.answers.length) {
        this.modalInfo.message = 'Empty answer fields exist.'
        this.modalInfo.details = ['Fill or delete empty answer fields before saving the question.']
        this.showMessage()
        return false
      } else if (correct < 1 || correct === this.answers.length) {
        this.modalInfo.message = 'Wrong correct answers count.'
        this.modalInfo.details = ['At least one correct answer must exist.', 'At least one wrong answer must exist.']
        this.showMessage()
        return false
      } else {
        return true
      }
    },
    activateSave () { this.buttons.save.active = true },
    inactivateSave () { this.buttons.save.active = false },
    cancel () {
      this.reset()
    },
    save () {
      if (this.validate()) {
        this.saved = true
        this.saveQuestion()
      }
    },
    reset () {
      this.question.value = ''
      this.answers[0].answer.value = ''
      this.answers[0].correct.checked = false
      this.answers[1].answer.value = ''
      this.answers[1].correct.checked = false
      for (var i = this.answers.length - 1; i >= 2; i--) {
        this.deleteAnswer(i)
      }
    },
    getAnswers () {
      let a = []
      for (var i = this.answers.length - 1; i >= 0; i--) {
        a.push({content: this.answers[i].answer.value, correct: this.answers[i].correct.checked})
      }
      let json = Object.assign({}, a)
      console.log(JSON.stringify(json))
      return JSON.stringify(json)
    },
    async saveToDb (id) {
      try {
        const response = await QuestionService.saveQuestion({
          question: this.question.value,
          answers: this.getAnswers(),
          userId: this.accountsId,
          quizId: this.selectedQuiz.id,
          id: id
        })
        console.log('response.data ', response.data)
      } catch (err) {
        console.log('response.err ', err)
      }
    },
    getId () {
      return Guid.namespacedGuid(Constants.QUESTIONESTOREPREFIX)
    },
    saveQuestion () {
      let id = this.getId()
      this.saveToDb(id)
    },
    okModal () {
      this.modal.state = false
      this.modal.res(true)
    },
    cancelModal () {
      this.modal.state = false
      this.modal.res(false)
    },
    toggledCheckbox (e, index) {
      this.answers[index].correct.checked = e.value
      this.checkForSave()
    },
    editTextarea (e, index) {
      if (index === undefined) {
        this.question.value = e.value
      } else {
        this.answers[index].answer.value = e.value
      }
      this.checkForSave()
    },
    checkForSave () {
      if (this.question.value.trim() !== '') {
        this.activateSave()
      } else {
        this.inactivateSave()
      }
    },
    hideInfo () {
      this.modalInfo.state = false
    },
    showMessage () {
      this.modalInfo.state = true
      setTimeout(this.hideInfo.bind(this), 3000)
    },
    checkForDelete (e, title, index) {
      if (this.answers.length < 3) {
        this.modalInfo.message = 'Cannot delete the answer.'
        this.modalInfo.details = ['The question must have at least tow answers.']
        this.showMessage()
      } else {
        this.askForDelete(e, title, index)
      }
    },
    addAnswer () {
      let l = this.answers.length
      if (l < Constants.MAXQUIESTIONCOUNT) {
        this.answers.push({
          answer: {
            name: (l + 1) + '.  Answer',
            required: true,
            value: '',
            eventName: 'answer'
          },
          correct: {
            name: 'The answer is correct',
            required: false,
            checked: false,
            eventName: 'toggled',
            emiter: 'answer' + (l + 1)
          }
        })
      }
      l = this.answers.length
      if (l === Constants.MAXQUIESTIONCOUNT) {
        this.buttons.addAnswer.active = false
      }
    },
    async askForDelete (e, title, index) {
      this.modal.name = 'Delete'
      this.modal.question = title
      this.promise = new Promise((resolve, reject) => {
        this.modal.state = true
        this.modal.res = resolve
        this.modal.rej = reject
      })
      const answer = await this.promise
      if (answer) {
        this.deleteAnswer(index)
      }
    },
    deleteAnswer (index) {
      this.answers.splice(index, 1)
      this.updateAnswersIndexes(index)
    },
    updateAnswersIndexes (index) {
      for (var i = this.answers.length - 1; i >= index; i--) {
        this.answers[i].answer.name = (i + 1) + '.  Answer'
        this.answers[i].correct.emiter = 'answer' + (i + 1)
      }
    }
  },
  created () {
    this.toolbarPosition = this.fixToolbarPosition
    for (var i = Constants.MINQUIESTIONCOUNT - 1; i >= 0; i--) {
      this.addAnswer()
    }
  },
  components: {
    RegularButton,
    ActiveToggleButton,
    EditBoardTextarea,
    EditBoardInputCheckbox,
    'ConfirmBase': () => import('@/modules/base/modals/ConfirmBase'),
    'InfoModal': () => import('@/modules/base/modals/InfoModal')
  },
  async beforeRouteLeave (to, from, next) {
    if (!this.saved && this.question.value !== '' && this.question.value.trim() !== '') {
      this.modal.name = 'Before Leave'
      if (to.name !== 'QuizSettings') {
        this.promise = new Promise((resolve, reject) => {
          this.modal.state = true
          this.modal.res = resolve
          this.modal.rej = reject
        })
        const answer = await this.promise
        if (answer) {
          next()
        } else {
          this.recoverToolbarPosition(this.toolbarPosition)
          next(false)
        }
      } else {
        next()
      }
    } else {
      next()
    }
  }
}
</script>

<style scoped lang="less">
  .lifted {
    margin-top: -2rem;
  }
  .lefted-hld {
    position: relative;
    width: 28rem;
    margin: 0 auto;
  .lefted {
    position: absolute;
    right: 0;
    top: 1.5rem;
  }
}
</style>
