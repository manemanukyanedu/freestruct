<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Students',
  data () {
    return {
      msg: 'Welcome to Your Students page. Here you can find all our tutorials, courses, tests and more.'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
