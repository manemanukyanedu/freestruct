import Vue from 'vue'
import localforage from 'localforage'
import Navbar from '@/modules/navigation/components/Navbar'
import FreeStruct from './FreeStruct'
import router from './routers'
import VeeValidate from 'vee-validate'
import store from './stores/store'
import ModalDialogs from 'vue-modal-dialogs'
Vue.use(ModalDialogs)
Vue.use(VeeValidate)
Vue.config.productionTip = false

localforage.config({
  name: 'freestruct'
})

/* eslint-disable no-new */
new Vue({
  el: '#free-struct',
  router,
  template: '<free-struct><navbar slot="navbar" /></free-struct>',
  components: { FreeStruct, Navbar },
  store,
  localforage
})
