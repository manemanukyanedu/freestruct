export default {
  changeQuizId (context, newId) {
    context.commit('CHANGEQUIZID', newId)
  },
  setQuizId (context, newId) {
    context.commit('SETQUIZID', newId)
  },
  setQuestionId (context, newId) {
    context.commit('SETQUESTIONID', newId)
  },
  changeView (context, newView) {
    context.commit('CHANGEVIEW', newView)
  },
  setActiveTool (context, name) {
    let temp = context.state.toolbar.map((val) => {
      if (val.name === name) {
        return Object.assign({}, val, {selected: true})
      } else {
        return Object.assign({}, val, {selected: false})
      }
    })
    context.commit('UPDATETOOLBAR', temp)
  },
  updateHeader (context, header) {
    context.commit('UPDATEHEADER', header)
  },
  updateToolbar (context, toolbar) {
    context.commit('UPDATETOOLBAR', toolbar)
  },
  addToolbarTool (context, tool) {
    let temp = context.state.toolbar.map((val) => {
      return Object.assign({}, val, {selected: false})
    })
    tool.selected = true
    temp.push(tool)
    context.commit('UPDATETOOLBAR', temp)
  },
  removeToolbarTool (context, tool) {
    let temp = context.state.toolbar.filter((val) => val.name !== tool.name)
    context.commit('UPDATETOOLBAR', temp)
  },
  // Quiz creation and edition
  setSelectedQuiz (context, selectedQuiz) {
    context.commit('SETSELECTEDQUIZ', selectedQuiz)
  },
  setSelectedQuestion (context, selectedQuestion) {
    context.commit('SETSELECTEDQUESTION', selectedQuestion)
  },
  setQuestionMode (context, questionMode) {
    context.commit('SETQUESTIONMODE', questionMode)
  },
  addQuiz (context, quiz) {
    context.commit('ADDQUIZ', quiz)
  },
  recoverToolbarPosition (context, toolbarPosition) {
    let temp = context.state.toolbar.map((val) => {
      return Object.assign({}, val, {selected: false})
    })
    temp[toolbarPosition].selected = true
    context.commit('UPDATETOOLBAR', temp)
  }
}
