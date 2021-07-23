<template>
  <div id="app">
    <connect></connect>
  </div>
</template>

<script>
import connect from './components/connect_page/connect.vue'
export default {
  name: 'App',
  components: {
    'connect': connect
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
