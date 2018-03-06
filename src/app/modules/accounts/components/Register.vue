<template>
  <div>
    <div  class="board">
      <h1>{{pageTitle}}</h1>
      <error-modal v-bind="modal" @CloseErrorDialogue="closeError()"></error-modal>
      <edit-board-input-text-required v-bind="fullname" @fullname="editInput($event)" @validity="validName($event)"></edit-board-input-text-required>
      <edit-board-input-email-required v-bind="email" @email="editInput($event)" @validity="validEmail($event)"></edit-board-input-email-required>
      <edit-board-input-password 
          v-bind="password" @password="editInput($event)" @validity="validPassword($event)"></edit-board-input-password>
      <edit-board-input-password 
          v-bind="passwordConfirm" @passwordConfirm="editInput($event)" @validity="validPasswordConfirm($event)"></edit-board-input-password>
      <div class="btn-hld" slot="buttons">
          <regular-button v-bind="buttons.signin" @ok="register()"></regular-button>
        </div>
    </div>
  </div>
</template>
<script>
import AuthenticateBase from '@/modules/accounts/components/AuthenticateBase'
import AuthenticationService from '@/services/AuthenticationService'
import EditBoardInputTextRequired from '@/modules/base/editables/EditBoardInputTextRequired'

export default {
  name: 'Register',
  extends: AuthenticateBase,
  data () {
    return {
      pageTitle: 'Create New Account',
      fullname: {
        feildName: 'fullname',
        name: 'Full Name',
        required: true,
        placeholder: 'Full Name',
        value: '',
        eventName: 'fullname',
        emiter: 'fullname',
        valid: false
      },
      email: {
        feildName: 'email',
        name: 'Email',
        required: true,
        placeholder: 'Email',
        value: '',
        eventName: 'email',
        emiter: 'email',
        valid: false
      },
      password: {
        feildName: 'password',
        name: 'Password',
        required: true,
        placeholder: 'Password',
        value: '',
        eventName: 'password',
        emiter: 'password',
        valid: false
      },
      passwordConfirm: {
        feildName: 'passwordConfirm',
        name: 'Confirm password',
        required: true,
        placeholder: 'Confirm password',
        value: '',
        eventName: 'passwordConfirm',
        emiter: 'passwordConfirm',
        valid: false
      },
      buttons: {
        signin: {name: 'Sign In', active: false, classes: [], eventName: 'ok'}
      }
    }
  },
  methods: {
    valid () {
      return this.fullname.valid && this.email.valid && this.password.valid && this.passwordConfirm.valid
    },
    validName (e) {
      if (e.emiter === 'fullname') {
        this.fullname.valid = e.value
      }
    },
    validEmail (e) {
      if (e.emiter === 'email') {
        this.email.valid = e.value
      }
    },
    validPassword (e) {
      if (e.emiter === 'password') {
        this.password.valid = e.value
      }
    },
    validPasswordConfirm (e) {
      if (e.emiter === 'passwordConfirm') {
        this.passwordConfirm.valid = (e.value && (this.password.value === this.passwordConfirm.value))
      }
    },
    reset () {
      this.fullname.value = ''
      this.email.value = ''
      this.passwordConfirm.value = ''
      this.password.value = ''
    },
    async register () {
      if (this.valid()) {
        try {
          const response = await AuthenticationService.register({
            fullname: this.fullname.value,
            email: this.email.value,
            password: this.password.value
          })
          if (response && response.data && response.status === 200) {
            this.onSuccess(response.data.user, response.data.token)
          }
          console.log('response.data ', response)
        } catch (err) {
          console.log('response.err ', err)
          this.setErrorMessage(err.response.data.error)
        }
      }
    },
    editInput (e) {
      if (e.emiter === 'email') {
        this.email.value = e.value
      } else if (e.emiter === 'password') {
        this.password.value = e.value
      } else if (e.emiter === 'passwordConfirm') {
        this.passwordConfirm.value = e.value
      } else if (e.emiter === 'fullname') {
        this.fullname.value = e.value
      }
    }
  },
  components: {
    EditBoardInputTextRequired
  }
}
</script>

<style scoped lang="less">
  
</style>
