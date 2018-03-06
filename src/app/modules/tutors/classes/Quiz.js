'use strict'

export default class Quiz {
  constructor (title, id, userId, desc = '', langs = [], total = false, answers = false, free = false, questionsCount = 0, passingCount = 0, usersCount = 0) {
    this.title = title
    this.id = id
    this.description = desc
    this.langs = langs
    this.total = total
    this.answers = answers
    this.free = free
    this.userId = userId
    this.questionsCount = questionsCount
    this.passingCount = passingCount
    this.usersCount = usersCount
  }
  toString () {
    return `title - ${this.title}, id - ${this.id}`
  }
  changeParams (paramsList) {
    console.log('Quiz changeParams function is called')
  }
}
