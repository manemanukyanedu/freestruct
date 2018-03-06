'use strict'

export default class ClientSideCrudWorker {
  constructor (Worker) {
    this.worker = new Worker()
    this.worker.onmessage = this.onMessage
    this.worker.onerror = this.onError
  }
  postMessage (message) {
    this.worker.postMessage(message)
  }
  terminate () {
    this.worker.terminate()
  }
  onMessage (e) {
    console.log('Worker said: ', e.data)
  }
  onError (e) {
    let msg = ['ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message].join('')
    console.log(msg)
  }
}
