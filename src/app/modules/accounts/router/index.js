const Register = () => import('@/modules/accounts/components/Register')
const Login = () => import('@/modules/accounts/components/Login')

export default [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
