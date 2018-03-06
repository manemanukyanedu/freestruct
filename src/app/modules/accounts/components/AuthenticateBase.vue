<script>
import RegularButton from '@/modules/base/buttons/Button'
import EditBoardInputPassword from '@/modules/base/editables/EditBoardInputPassword'
import EditBoardInputEmailRequired from '@/modules/base/editables/EditBoardInputEmailRequired'
import ErrorModal from '@/modules/base/modals/ErrorModal'
import Account from '@/modules/accounts/classes/Account'
import Session from '@/modules/accounts/classes/Session'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AuthenticateBase',
  data () {
    return {
      modal: {
        name: 'Error',
        type: 'error',
        state: false,
        message: '',
        details: [],
        closeEvent: 'CloseErrorDialogue'
      }
    }
  },
  computed: {
    ...mapGetters({
      accountsDB: 'Authenticate/accountsDB'
    })
  },
  methods: {
    ...mapActions({
      changeAccount: 'Authenticate/changeAccount',
      setUser: 'Authenticate/setUser',
      setToken: 'Authenticate/setToken',
      authenticate: 'Authenticate/authenticate'
    }),
    onSuccess (user, token) {
      let account = {name: user.fullname, email: user.email, avatar: ''}
      this.authenticate(true)
      this.setUser(account)
      this.save(account, token)
      this.setToken(token)
      this.reset()
      this.$router.push({name: 'Home'})
    },
    setErrorMessage (error) {
      this.modal.state = true
      if (typeof error === 'string') {
        this.modal.message = error
      } else if (typeof error === 'object') {
        this.modal.message = error.title
        this.modal.details = error.desc
      }
    },
    closeError () {
      this.modal.state = false
      this.modal.message = ''
      this.modal.details = []
    },
    save (v, token) {
      let id = this.accountsDB.getId()
      v.id = id
      let qc = new Account(v)
      let session = new Session({token: token, id: id, authenticated: true})
      let account = { account: qc, id: id, session: session }
      this.changeAccount(qc)
      this.accountsDB.clearStoreInstance()
      this.accountsDB.save(account)
    }
  },
  components: {
    RegularButton,
    EditBoardInputEmailRequired,
    EditBoardInputPassword,
    ErrorModal
  }
}
</script>

<style scoped lang="less">
  
</style>
