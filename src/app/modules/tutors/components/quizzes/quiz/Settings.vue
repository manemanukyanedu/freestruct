<template>
  <div>
    <div >
      <edit-board-input-text class="seperated" v-bind="title" @editTitle="editInput($event)"></edit-board-input-text>
      <edit-board-textarea class="seperated" v-bind="desc" @editDescription="editTextarea($event)"></edit-board-textarea>
      <edit-board-select class="seperated" v-bind="lang" @editLang="editSelect($event)"></edit-board-select>
      <edit-board-input-checkbox class="seperated" v-bind="total" @toggled="toggledCheckbox($event)"></edit-board-input-checkbox>
      <edit-board-input-checkbox class="seperated" v-bind="answers" @toggled="toggledCheckbox($event)"></edit-board-input-checkbox>
      <edit-board-input-checkbox class="seperated" v-bind="free" @toggled="toggledCheckbox($event)"></edit-board-input-checkbox>
      <div class="btn-hld" slot="buttons">
          <regular-button v-bind="buttons.cancel"  @cancel="cancel()"></regular-button>
          <active-toggle-button v-bind="buttons.save" class="right" @save="save()"></active-toggle-button>
        </div>
      <confirm-base v-bind="modal" @OkModal="okModal" @CancelModal ="cancelModal"></confirm-base>
    </div>
  </div>
</template>
<script>
import RegularButton from '@/modules/base/buttons/Button'
import ActiveToggleButton from '@/modules/base/buttons/ActiveToggleButton'
import EditBoardInputText from '@/modules/base/editables/EditBoardInputText'
import EditBoardTextarea from '@/modules/base/editables/EditBoardTextarea'
import EditBoardSelect from '@/modules/base/editables/EditBoardSelect'
import EditBoardInputCheckbox from '@/modules/base/editables/EditBoardInputCheckbox'
import QuizService from '@/services/quiz/QuizService'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Settings',
  data () {
    return {
      toolbarPosition: null,
      modal: {
        name: 'Before Leave',
        state: false,
        type: 'confirm',
        closeEvent: 'close',
        question: 'You have changes in this page, do you want to leave the page without saving them?',
        res: null,
        rej: null
      },
      title: {
        name: 'Quiz title',
        required: true,
        placeholder: 'Title',
        value: '',
        eventName: 'editTitle',
        emiter: 'title'
      },
      desc: {
        name: 'Quiz Description',
        required: false,
        value: '',
        eventName: 'editDescription',
        emiter: 'desc'
      },
      lang: {
        name: 'Quiz Language',
        required: true,
        value: '',
        options: ['English', 'Russian', 'Armenian'],
        eventName: 'editLang',
        emiter: 'title'
      },
      total: {
        name: 'Show total amount?',
        required: false,
        checked: true,
        eventName: 'toggled',
        emiter: 'total'
      },
      answers: {
        name: 'Show correct answer after answering the question?',
        required: false,
        checked: false,
        eventName: 'toggled',
        emiter: 'answers'
      },
      free: {
        name: 'Is the quiz free?',
        required: false,
        checked: false,
        eventName: 'toggled',
        emiter: 'free'
      },
      buttons: {
        cancel: {name: 'Cancel', active: true, classes: ['left'], eventName: 'cancel'},
        save: {name: 'Save', active: false, classes: [], eventName: 'save'}
      },
      saved: true
    }
  },
  computed: {
    ...mapGetters({
      fixToolbarPosition: 'QuizzesStore/fixToolbarPosition',
      toolbar: 'QuizzesStore/toolbar',
      accountsId: 'Authenticate/accountsId',
      selectedView: 'QuizzesStore/selectedView',
      selectedQuiz: 'QuizzesStore/selectedQuiz'
    })
  },
  methods: {
    ...mapActions({
      setQuizId: 'QuizzesStore/setQuizId',
      recoverToolbarPosition: 'QuizzesStore/recoverToolbarPosition',
      changeView: 'QuizzesStore/changeView'
    }),
    init () {
      this.title.value = this.selectedQuiz.title
      this.lang.value = (this.selectedQuiz.langs === null) ? '' : this.selectedQuiz.langs[0]
      this.desc.value = this.selectedQuiz.description
      this.total.checked = this.selectedQuiz.total
      this.answers.checked = this.selectedQuiz.answers
      this.free.checked = this.selectedQuiz.free
      this.saved = true
    },
    validate () {
      if (this.title.value !== '' && this.title.value.trim() !== '' && this.title.value !== '') {
        this.saved = false
        this.activateSave()
      } else {
        this.inactivateSave()
      }
    },
    activateSave () {
      this.buttons.save.active = true
      this.saved = false
    },
    inactivateSave () {
      this.buttons.save.active = false
      this.saved = true
    },
    reset () {
      this.title.value = this.selectedQuiz.title
      this.desc.value = this.selectedQuiz.description
      this.lang.value = (this.selectedQuiz.langs === null) ? '' : this.selectedQuiz.langs[0]
      this.total.checked = this.selectedQuiz.total
      this.answers.checked = this.selectedQuiz.answers
      this.free.checked = this.selectedQuiz.free
      this.saved = true
      this.inactivateSave()
    },
    checkForSave () {
      let l = (this.selectedQuiz.langs === null) ? '' : this.selectedQuiz.langs[0]
      if (this.title.value !== this.selectedQuiz.title || this.desc.value !== this.selectedQuiz.description || this.total.checked !== this.selectedQuiz.total || this.answers.checked !== this.selectedQuiz.answers || this.free.checked !== this.selectedQuiz.free || this.lang.value !== l) {
        this.activateSave()
      } else {
        this.inactivateSave()
      }
    },
    cancel () {
      this.reset()
    },
    save () {
      this.saveQuiz()
      this.saved = true
    },
    editInput (e) {
      this.title.value = e.value
      this.validate()
    },
    editTextarea (e) {
      this.desc.value = e.value
      this.checkForSave()
    },
    toggledCheckbox (e) {
      switch (e.emiter) {
        case ('answers'):
          this.answers.checked = e.value
          break
        case ('free'):
          this.free.checked = e.value
          break
        case ('total'):
          this.total.checked = e.value
          break
      }
      this.checkForSave()
    },
    editSelect (e) {
      this.lang.value = e.value
      this.checkForSave()
    },
    saveQuiz () {
      this.saveToDb()
    },
    async saveToDb () {
      try {
        let langs = [this.lang.value]
        const response = await QuizService.updateQuiz({
          title: this.title.value,
          description: this.desc.value,
          langs: langs,
          total: this.total.checked,
          answers: this.answers.checked,
          free: this.free.checked,
          userId: this.accountsId,
          id: this.selectedQuiz.id
        })
        console.log('response.data ', response.data)
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
  components: {
    RegularButton,
    ActiveToggleButton,
    EditBoardTextarea,
    EditBoardSelect,
    EditBoardInputCheckbox,
    EditBoardInputText,
    'ConfirmBase': () => import('@/modules/base/modals/ConfirmBase')
  },
  created: function () {
    this.init()
    this.toolbarPosition = this.fixToolbarPosition
  },
  async beforeRouteLeave (to, from, next) {
    if (!this.saved) {
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
  }
}
</script>

<style scoped lang="less">
  
</style>
