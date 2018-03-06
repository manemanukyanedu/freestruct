'use strict'

export default class Session {
  constructor ({token = '', id = '', authenticated = false}) {
    console.log(token, authenticated, id)
    this.token = token
    this.id = id
    this.authenticated = authenticated
  }
  toString () {
    return `token - ${this.token}, id - ${this.authenticated}, authenticated - ${this.authenticated}`
  }
}
