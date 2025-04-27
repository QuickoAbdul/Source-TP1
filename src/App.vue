<template>
  <nav>
    <router-link to="/">Home</router-link> 
    <router-link to="/listing">Listing</router-link>
    <router-link to="/add">Add</router-link>
  </nav>
  <router-view/>

  <MyFooter>
    <template #left>
      <p>Shahzad Abdul Rahman</p>
    </template>
    <template #center>
      <p>Master TNSID</p>
    </template>
    <template #right>
      <p>Technologie web TP2</p>
    </template>
  </MyFooter>
</template>

<script setup>
import MyFooter from './components/footer.vue';
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
