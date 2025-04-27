<template>
  <div class="home">
    <Biere />
  </div>
</template>

<script>
// @ is an alias to /src
import Biere from '@/components/biere.vue';

export default {
  name: 'HomeView',
  components: {
    Biere,
  }
}
</script>
