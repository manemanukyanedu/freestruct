import LFCRUD from '@/services/localforageCrud'
import Constants from '@/modules/accounts/api/constants'

function check (context) {
  if (context.state.accountsDB === null) {
    let accountsDB = new LFCRUD(Constants.ACCOUNTSTORENAME, Constants.ACCOUNTESTOREPREFIX)
    context.commit('SETACCOUNTDB', accountsDB)
  }
}

export default {
  authenticate (context, state) {
    context.commit('AUTHENTICATE', { authenticated: state })
  },
  setToken (context, token) {
    context.commit('TOKEN', { token: token })
  },
  setUser (context, user) {
    context.commit('USER', user)
  },
  signout (context) {
    check(context)
    context.state.accountsDB.clearStoreInstance()
    context.commit('SIGNOUT')
  },
  changeAccount (context, account) {
    check(context)
    context.commit('CHANGEACCOUNT', account)
    context.commit('SETACCOUNTID', account.id)
  },
  setAccountDB (context, accountsDB) {
    context.commit('SETACCOUNTDB', accountsDB)
  },
  setAccountId (context, accountsId) {
    context.commit('SETACCOUNTID', accountsId)
  },
  setDB (context) {
    check(context)
  },
  checkAuthenticateState (context) {
    check(context)
    context.state.accountsDB.loadAll().then(function (results) {
      let r = Object.values(results)[0]
      if (r && r.account) {
        let user = {
          name: r.account.name,
          email: r.account.email,
          avatar: r.account.avatar
        }
        context.commit('USER', user)
        context.commit('SETACCOUNTID', r.id)
        context.commit('TOKEN', { token: r.session.token })
        context.commit('AUTHENTICATE', { authenticated: true })
      }
    })
  }
}
