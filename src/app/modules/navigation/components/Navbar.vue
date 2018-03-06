<template>
  <nav class="navbar" :class="{ 'no-alfa': scrolled }">
    <img :src="img">
    <ul>
      <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'About' }">About</router-link></li>
      <li><router-link :to="{ name: 'Conntacts' }">Conntacts</router-link></li>
      <li><navigation-button :name="logedIn" @clicked="loginLogout()"></navigation-button></li>
    </ul>
  </nav>
</template>

<script>
import image from '@/assets/images/logos/logo-white.png'
import NavigationButton from '@/modules/navigation/components/NavigationButton'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      img: image,
      scrolled: false,
      login: 'Sign In'
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'Authenticate/authenticated'
    }),
    logedIn: function () {
      if (this.authenticated) {
        return 'Sign Out'
      } else {
        return 'Sign In'
      }
    }
  },
  methods: {
    ...mapActions({
      signout: 'Authenticate/signout'
    }),
    handleScroll (event) {
      this.scrolled = window.scrollY > 0
    },
    loginLogout () {
      if (this.authenticated) {
        this.signout()
      } else {
        this.$router.push({name: 'Login'})
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    NavigationButton
  }
}
</script>

<style scoped lang="less">
  
</style>
