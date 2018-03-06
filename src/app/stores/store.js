import Vue from 'vue'
import Vuex from 'vuex'

import NavigationStore from '@/modules/navigation/store/store'
import Authenticate from '@/modules/accounts/store'
import QuizzesStore from '@/modules/tutors/store/quizzes/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    NavigationStore,
    Authenticate,
    QuizzesStore
  }
})
