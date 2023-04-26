<template>
  <TheHeader></TheHeader>
  
  <main>
    <section>
      <RouterView />
    </section>
  </main>
  
  <footer>
    <p>Le Blog - 2023</p>
  </footer>  
</template>

<script>
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';

export default {
  components: {
    TheHeader
  }
}
</script>

<style scoped>

</style>