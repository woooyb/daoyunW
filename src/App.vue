<template>
  <div id="app">
    <router-view v-if="msg"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true,
        msg: true
      }
    },
    methods: {
      reload () {
        this.msg = false
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.msg = true
          this.isRouterAlive = true;
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
