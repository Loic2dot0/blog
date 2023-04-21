<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>
      <RouterLink to="/" >Le Blog</RouterLink>
    </h1>
    <input type="checkbox" id="btn-nav">
    <label for="btn-nav" class="nav__button" title="bouton de menu"><span></span></label>

    <nav class="nav">
      <RouterLink to="/post" class="nav__link">Articles</RouterLink>
      <RouterLink to="/photos" class="nav__link">Photos</RouterLink>
      <RouterLink to="/videos" class="nav__link">Videos</RouterLink>
      <RouterLink to="/about" class="nav__link">A propos</RouterLink>
      <RouterLink to="/login" class="nav__link">Login</RouterLink>
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