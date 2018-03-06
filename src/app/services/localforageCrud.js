'use strict'

import localforage from 'localforage'
import ClientSideCrud from '@/services/ClientSideCrudBase'
require('localforage-startswith')

export default class LocalForageClientSideCrud extends ClientSideCrud {
  constructor (dbName, storeNamespace) {
    super(dbName, storeNamespace)
    this.localforage = localforage
    this.instance = null
    this.createStoreInstance()
  }
  createStoreInstance () {
    super.createStoreInstance()
    this.instance = this.localforage.createInstance({name: this.dbName})
  }
  clearStoreInstance () {
    this.instance.clear().then(function () {
      console.log('Database is now empty.')
    }).catch(function (err) {
      console.log(err)
    })
  }
  save (elem) {
    super.save(elem)
    this.instance.setItem(elem.id, elem).then(function (elem) {
      console.log('Set item ', elem)
    }).catch(function (err) {
      console.log(err)
    })
  }
  loadAll () {
    super.loadAll()
    return this.instance.startsWith(this.storeNamespace)
  }
}
