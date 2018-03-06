import actions from './actions'
import mutations from './mutations'

const state = {
  pathList: []
}
const getters = {
  pathList: state => {
    return state.pathList
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
