'use strict'

export default class Answer {
  constructor (content = '', correct = false) {
    this.content = content
    this.correct = correct
  }
  toString () {
    return `content - ${this.content}, correct - ${this.correct}`
  }
}
