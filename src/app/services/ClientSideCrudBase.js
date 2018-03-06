'use strict'

import Guid from '@/utils/Guid.js'

export default class ClientSideCrud {
  constructor (dbName, storeNamespace) {
    this.dbName = dbName
    this.storeNamespace = storeNamespace
  }
  toString () {
    return `${this.dbName} with ${this.storeNamespace}`
  }
  getId () {
    return Guid.namespacedGuid(this.storeNamespace)
  }
  createStoreInstance () {
    console.log('base create function is called')
  }
  load (id) {
    console.log('base load function is called')
  }
  loadAll () {
    console.log('base loadAll function is called')
  }
  save (item) {
    console.log('base add function is called with item - ', item)
  }
  update (id, item) {
    console.log('base update function is called')
  }
  remove (id) {
    console.log('base remove function is called')
  }
}
