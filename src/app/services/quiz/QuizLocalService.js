'use strict'
/*
import LFCRUD from '@/services/local/localforageCrud'

import Constants from '@/modules/tutors/api/constants' */
import Quiz from '@/modules/tutors/classes/Quiz'
import QuizWorker from '@/services/quiz/QuizWorker'
import Worker from './quiz.worker.js'
export default class QuizLocalCrud {
  constructor () {
    this.task = new QuizWorker(Worker)
    this.task.createStoreInstance()
  }
  save (title, id, userId) {
    let qc = new Quiz(title, id, userId)
    let quiz = { quiz: qc, id: id }
    this.task.save(quiz)
  }
  loadQuis (id, userId) {
    console.log('quis load function is called')
  }
  loadAll (userId) {
    console.log('quiz loadAll function is called')
  }
  update (id, userId, item) {
    console.log('base update function is called')
  }
  remove (id, userId) {
    console.log('base remove function is called')
  }
}
