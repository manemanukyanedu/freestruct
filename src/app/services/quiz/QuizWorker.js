'use strict'

import ClientSideCrudWorker from '@/services/local/ClientSideCrudWorker'

export default class QuizWorker extends ClientSideCrudWorker {
  createStoreInstance () {
    this.postMessage({cmd: 'createStoreInstance', val: {}})
  }
  clearStoreInstance () {
    this.postMessage({cmd: 'clearStoreInstance', val: {}})
  }
  save (elem) {
    this.postMessage({cmd: 'saveElement', val: elem})
  }
  updateElement (elem) {
    this.postMessage({cmd: 'updateElement', val: elem})
  }
  deleteElement (elem) {
    this.postMessage({cmd: 'deleteElement', val: elem})
  }
  getById (elem) {
    this.postMessage({cmd: 'getById', val: elem})
  }
  loadAll () {
    this.postMessage({cmd: 'saveElement', val: {}})
  }
}
