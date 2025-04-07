<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Biere />
    <Listbiere />
  </div>
</template>

<script>
// @ is an alias to /src
import Biere from '@/components/biere.vue';
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Biere,
  }
}
</script>
