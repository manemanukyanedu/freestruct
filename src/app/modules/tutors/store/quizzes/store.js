import actions from './actions'
import mutations from './mutations'

const state = {
  view: '',
  header: {
    name: '',
    operaton: {}
  },
  toolbar: [],
  selectedQuiz: null,
  quizId: null,
  selectedQuestion: null,
  questionMode: '',
  questionId: null
}
const getters = {
  selectedView: state => {
    return state.view
  },
  boardHeader: state => {
    return state.header
  },
  toolbar: state => {
    return state.toolbar
  },
  selectedQuiz: state => {
    return state.selectedQuiz
  },
  quizId: state => {
    return state.quizId
  },
  selectedQuestion: state => {
    return state.selectedQuestion
  },
  questionMode: state => {
    return state.questionMode
  },
  questionId: state => {
    return state.quizId
  },
  fixToolbarPosition: state => {
    for (let i = state.toolbar.length - 1; i >= 0; i--) {
      if (state.toolbar[i].selected === true) {
        return i
      }
    }
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
