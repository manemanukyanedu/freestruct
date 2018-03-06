import Api from '@/services/api'
export default {
  index (credentials) {
    return Api().post('question/getAll', credentials)
  },
  getQuestion (credentials) {
    return Api().post('question/question', credentials)
  },
  saveQuestion (credentials) {
    return Api().post('question/save', credentials)
  },
  updateQuestion (credentials) {
    return Api().post('question/edit', credentials)
  },
  deleteQuestion (credentials) {
    return Api().post('question/delete', credentials)
  }
}
