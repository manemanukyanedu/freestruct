import Vue from 'vue'
import Router from 'vue-router'
import NotFoundComponent from '@/modules/navigation/components/NotFoundComponent'
import Home from '@/modules/navigation/components/Home'
import About from '@/modules/navigation/components/About'
import Conntacts from '@/modules/navigation/components/Contacts'

import tutorsRoutes from '@/modules/tutors/router'
import studentsRoutes from '@/modules/students/router'
import accountsRoutes from '@/modules/accounts/router'

Vue.use(Router)

const baseRoutes = [
  {
    path: '*',
    component: NotFoundComponent
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/conntacts',
    name: 'Conntacts',
    component: Conntacts
  }
]

const routes = baseRoutes.concat(accountsRoutes).concat(studentsRoutes).concat(tutorsRoutes)

export default new Router({
  routes
})
