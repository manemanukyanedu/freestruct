import actions from './actions'
import mutations from './mutations'

const state = {
  accountsDB: null,
  accountsId: null,
  user: {
    name: '',
    email: '',
    avatar: ''
  },
  account: {},
  authenticated: false,
  token: ''
}
const getters = {
  accountsDB: state => {
    return state.accountsDB
  },
  accountsId: state => {
    return state.accountsId
  },
  account: state => {
    return state.account
  },
  authenticated: state => {
    return state.authenticated
  },
  token: state => {
    return state.token
  },
  user: state => {
    return state.user
  }
}

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
