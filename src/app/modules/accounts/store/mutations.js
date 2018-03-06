export default {
  CHANGEACCOUNT (state, account) {
    state.account = account
  },
  AUTHENTICATE (state, payload) {
    state.authenticated = payload.authenticated
  },
  TOKEN (state, payload) {
    state.token = payload.token
  },
  USER (state, user) {
    state.user = user
  },
  SIGNOUT (state, user) {
    state.user = {
      name: '',
      email: '',
      avatar: ''
    }
    state.token = ''
    state.authenticated = false
  },
  SETACCOUNTDB (state, accountsDB) {
    state.accountsDB = accountsDB
  },
  SETACCOUNTID (state, accountsId) {
    state.accountsId = accountsId
  }
}
