export default {
  CHANGEQUIZID (state, newId) {
    state.quizId = newId
  },
  SETQUIZID (state, newId) {
    state.quizId = newId
  },
  SETQUESTIONID (state, newId) {
    state.questionId = newId
  },
  CHANGEVIEW (state, newView) {
    state.view = newView
  },
  UPDATEHEADER (state, header) {
    state.header = header
  },
  UPDATETOOLBAR (state, toolbar) {
    state.toolbar = toolbar
  },
  // Quiz creation and edition
  SETSELECTEDQUIZ (state, selectedQuiz) {
    state.selectedQuiz = selectedQuiz
  },
  SETSELECTEDQUESTION (state, selectedQuestion) {
    state.selectedQuestion = selectedQuestion
  },
  SETQUESTIONMODE (state, questionMode) {
    state.questionMode = questionMode
  },
  ADDQUIZ (state, quiz) {
    state.quizList.push(quiz)
  },
  SETQUIZLIST (state, list) {
    state.quizList = list
  }
}
