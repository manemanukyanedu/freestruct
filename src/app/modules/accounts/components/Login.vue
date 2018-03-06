<template>
  <div>
    <div  class="board">
      <h1>{{pageTitle}}</h1>
      <error-modal v-bind="modal" @CloseErrorDialogue="closeError()"></error-modal>
      <edit-board-input-email-required v-bind="email" @email="editInput($event)" @validity="validEmail($event)"></edit-board-input-email-required>
      <edit-board-input-password 
          v-bind="password" @password="editInput($event)" @validity="validPassword($event)"></edit-board-input-password>
      <edit-board-input-password 
      <div class="btn-hld" slot="buttons">
          <regular-button v-bind="buttons.register" class="left" @register="register()"></regular-button>
          <regular-button v-bind="buttons.login" class="right" @login="login()"></regular-button>
        </div>
    </div>
  </div>
</template>
<script>
import AuthenticateBase from '@/modules/accounts/components/AuthenticateBase'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Login',
  extends: AuthenticateBase,
  data () {
    return {
      pageTitle: 'Login',
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
      buttons: {
        login: {name: 'Login', active: false, classes: [], eventName: 'login'},
        register: {name: 'Register', classes: [], eventName: 'register'}
      }
    }
  },
  methods: {
    valid () {
      return this.email.valid && this.password.valid
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
    async login () {
      if (this.valid()) {
        try {
          const response = await AuthenticationService.login({
            email: this.email.value,
            password: this.password.value
          })
          if (response && response.data && response.status === 200) {
            this.onSuccess(response.data.user, response.data.token)
          }
          console.log('response.data ', response.data)
        } catch (err) {
          console.log('response.err ', err)
          if (err.response !== undefined) {
            this.setErrorMessage(err.response.data.error)
          }
        }
      }
    },
    reset () {
      this.email.value = ''
      this.password.value = ''
    },
    editInput (e) {
      if (e.emiter === 'email') {
        this.email.value = e.value
      } else if (e.emiter === 'password') {
        this.password.value = e.value
      }
    },
    register () {
      this.$router.push({name: 'Register'})
    }
  }
}
</script>

<style scoped lang="less">
  
</style>
