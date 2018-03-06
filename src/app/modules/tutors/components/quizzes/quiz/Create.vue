<template>
  <div>
    <div >
      <edit-board-input-text v-bind="edit" @edit="editInput($event)"></edit-board-input-text>
      <div class="btn-hld" slot="buttons">
          <regular-button v-bind="buttons.cancel"  @cancel="cancel()"></regular-button>
          <active-toggle-button v-bind="buttons.settings" class="left-spin right" @settings="settings()"></active-toggle-button>
          <active-toggle-button v-bind="buttons.save" class="right" @save="save()"></active-toggle-button>
        </div>
      <confirm-base v-bind="modal" @OkModal="okModal" @CancelModal ="cancelModal"></confirm-base>
      <info-modal v-bind="modalInfo" @close ="hideInfo"></info-modal>
    </div>
  </div>
</template>
<script>
import RegularButton from '@/modules/base/buttons/Button'
import ActiveToggleButton from '@/modules/base/buttons/ActiveToggleButton'
import EditBoardInputText from '@/modules/base/editables/EditBoardInputText'
import { mapGetters, mapActions } from 'vuex'
import QuizService from '@/services/quiz/QuizService'
import QuizLocalService from '@/services/quiz/QuizLocalService'
import Guid from '@/utils/Guid.js'
import Constants from '@/modules/tutors/api/constants'

export default {
  name: 'Create',
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
      edit: {
        name: 'Quiz title',
        required: true,
        placeholder: 'Title',
        value: '',
        eventName: 'edit'
      },
      buttons: {
        cancel: {name: 'Cancel', active: true, classes: ['left'], eventName: 'cancel'},
        save: {name: 'Save', active: false, classes: [], eventName: 'save'},
        settings: {name: 'Settings & Ditales', active: false, classes: [], eventName: 'settings'}
      },
      promise: null,
      saved: false
    }
  },
  computed: {
    disabled: function () {
      return !this.active
    },
    ...mapGetters({
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
    showMessage () {
      this.modalInfo.state = true
      setTimeout(this.hideInfo.bind(this), 3000)
    },
    hideInfo () {
      this.modalInfo.state = false
    },
    selectView () { this.$router.push({name: this.selectedView}) },
    validateTitle () {
      if (this.edit.value !== '' && this.edit.value.trim() !== '') {
        // TODO: Check for name coalisions...
        this.saved = false
        this.activateSave()
      } else {
        this.inactivateSave()
      }
    },
    activateSave () { this.buttons.save.active = true },
    inactivateSave () { this.buttons.save.active = false },
    activateSettings () { this.buttons.settings.active = true },
    inactivateSettings () { this.buttons.settings.active = false },
    cancel () {
      this.edit.value = ''
      this.validateTitle()
      this.inactivateSettings()
    },
    save () {
      this.saved = true
      this.activateSettings()
      this.saveQuiz()
    },
    async saveToDb (id) {
      try {
        const response = await QuizService.saveQuiz({
          title: this.edit.value,
          userId: this.accountsId,
          id: id
        })
        if (response.status === 200) {
          if (response.data.created) {
            this.modalInfo.message = 'The quiz created successfully.'
            this.modalInfo.details = []
            this.showMessage()
          } else {
            this.modalInfo.message = response.data.message
            this.modalInfo.details = []
            this.showMessage()
          }
        }
        console.log('response.data ', response.data)
      } catch (err) {
        console.log('response.err ', err)
      }
    },
    settings () {
      // TODO:
      this.changeView('QuizSettings')
      this.$router.push({name: this.selectedView, params: {title: this.edit.value}})
    },
    editInput (e) {
      this.edit.value = e.value
      this.validateTitle()
    },
    getId () {
      return Guid.namespacedGuid(Constants.QUIZESTOREPREFIX)
    },
    saveQuiz () {
      let localDB = new QuizLocalService()
      let id = this.getId()
      localDB.save(this.edit.value, id, this.accountsId)
      this.saveToDb(id)
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
    this.toolbarPosition = this.fixToolbarPosition
  },
  components: {
    RegularButton,
    ActiveToggleButton,
    EditBoardInputText,
    'ConfirmBase': () => import('@/modules/base/modals/ConfirmBase'),
    'InfoModal': () => import('@/modules/base/modals/InfoModal')
  },
  async beforeRouteLeave (to, from, next) {
    if (!this.saved && this.edit.value !== '' && this.edit.value.trim() !== '') {
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

<style scoped lang="less"></style>
