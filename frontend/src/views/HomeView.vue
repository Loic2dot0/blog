<template>
    <h2>Les derniers articles</h2>

    <div class="recent-container">
        <PostCard v-for="(post, index) in posts" :key="index" :post="post"></PostCard>
        <div class="recent-container__link">
            <RouterLink to="/post" class="button">Voir tous les articles</RouterLink>
        </div>
    </div>

    <h2>Les derniers albums</h2>
    
    <div class="recent-container">

        <div class="recent-container__link">
            <RouterLink to="/photos" class="button">Voir tous les albums</RouterLink>
        </div>
    </div>

    <h2>Les dernières vidéos</h2>

    <div class="recent-container">
        
        <div class="recent-container__link">
            <RouterLink to="/videos" class="button">Voir tous les vidéos</RouterLink>
        </div>
    </div>

</template>
 
<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';

import PostCard from '../components/PostCard.vue';

export default {
    name: 'HomeView',
    components: {
        PostCard,
    },
    data() {
        return {
            posts: [],
            isLoading: false,
        }
    },
    methods: {
      getPosts(){
        this.isLoading = true;
        axios.get(`${import.meta.env.VITE_URL_API}/post?limit=3`)
          .then(res => {
            this.posts = res.data.rows;
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.isLoading = false;
          })
      },
    },
    created() {
      this.getPosts();
    }
};
</script>

<style>
  
</style>  