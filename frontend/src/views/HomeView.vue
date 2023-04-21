<template>
    <h2>Les derniers articles</h2>

    <div class="recent-container">
        <RouterLink to="/post" class="button">Voir tous les articles</RouterLink>
    </div>

    <h2>Les derniers albums</h2>
    
    <div class="recent-container">
        <RouterLink to="/photos" class="button">Voir tous les articles</RouterLink>
    </div>

    <h2>Les dernières vidéos</h2>

    <div class="recent-container">
        <RouterLink to="/videos" class="button">Voir tous les articles</RouterLink>
    </div>

</template>
 
<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'HomeView',
};
</script>

<style>
  
</style>  