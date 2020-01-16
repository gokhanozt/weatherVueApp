<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'my-app',
    methods: {
      handleStyles () {
        // Red style to the body tag for the home page
        if (['/'].includes(this.$route.path)) document.body.className = 'bg-dark'
        // Pink style to the body tag for all other pages
        else if (document.body.classList.contains('bg-red')) document.body.className = 'bg-pink'
      }
    },
    // Handle styles when the app is initially loaded
    mounted () {
      this.handleStyles()
    },
    // Handle styles when the route changes
    watch: {
      '$route' () {
        this.handleStyles()
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
.bg-dark {
  background: #343a40;
}
.bg-pink {
  background: pink;
}
 #app select{
    color: #343a40;
  }


</style>
