<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Le Blog</h1>
    <input type="checkbox" id="btn-nav">
    <label for="btn-nav" class="nav__button" title="bouton de menu"><span></span></label>

    <nav class="nav">
      <RouterLink to="/">Articles</RouterLink>
      <RouterLink to="/photos">Photos</RouterLink>
      <RouterLink to="/videos">Videos</RouterLink>
      <RouterLink to="/about">A propos</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>

  <main>
    <section>
      <RouterView />
    </section>
  </main>
  
  <footer>
    <p>Le Blog - 2023</p>
  </footer>  
</template>

<style scoped>

</style>