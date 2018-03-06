export default {
  changePath (context, list) {
    context.commit('CHANGEPATH', list)
  },
  addPath (context, newPath) {
    context.commit('ADDPATH', newPath)
  }
}
