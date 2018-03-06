export default {
  CHANGEPATH (state, newPath) {
    state.pathList = newPath
  },
  ADDPATH (state, newPath) {
    if (newPath.position > state.pathList.length) {
      state.pathList.push(newPath.name)
    } else if (newPath.position === state.pathList.length) {
      state.pathList.pop()
      state.pathList.push(newPath.name)
    } else {
      state.pathList = state.pathList.slice(0, newPath.position - 1)
      state.pathList.push(newPath.name)
    }
  }
}
