'use strict'

export default class Question {
  constructor (question, id, userId, quizId = '', answers = []) {
    this.question = question
    this.id = id
    this.userId = userId
    this.quizId = quizId
    this.answers = answers
  }
  toString () {
    return `Question - ${this.question}, id - ${this.id}`
  }
  changeParams (paramsList) {
    console.log('Question changeParams function is called')
  }
}
