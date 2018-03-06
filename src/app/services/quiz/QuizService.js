import Api from '@/services/api'
export default {
  index (userId) {
    return Api().get('quizzes/user:' + userId)
  },
  getQuiz (credentials) {
    return Api().post('quizzes/quiz', credentials)
  },
  saveQuiz (credentials) {
    return Api().post('quizzes', credentials)
  },
  updateQuiz (credentials) {
    return Api().post('quizzes/edit', credentials)
  },
  deleteQuiz (credentials) {
    return Api().post('quizzes/delete', credentials)
  }
}
