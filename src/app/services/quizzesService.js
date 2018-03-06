import Api from '@/services/api'
export default {
  index () {
    return Api().get('quizzes')
  }
}
