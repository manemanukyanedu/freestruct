'use strict'

export default class Account {
  constructor ({name = '', email = '', avatar = '', id = ''}) {
    console.log(name, email, avatar, id)
    this.name = name
    this.id = id
    this.email = email
    this.avatar = avatar
  }
  toString () {
    return `name - ${this.name}, id - ${this.id}`
  }
  changeParams (paramsList) {
    console.log('Account changeParams function is called')
  }
}
