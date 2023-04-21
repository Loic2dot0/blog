<template>
  <h2>Articles</h2>

  <PostCategory @categorySelected="categorySelected = $event"></PostCategory>

  <div class="card-container">
    <div v-if="isLoading" class="loading">chargement des articles en cours... <span class="loader"></span></div>
    <p v-else-if="posts.rows.length == 0" class="alert">Aucun article</p>
    <PostCard v-else v-for="(post, index) in posts.rows" :key="index" :post="post"></PostCard>
  </div>
  
  <Pagination :totalElements="totalPosts" :currentPage="currentPage" @changePageNumber="changePageNumber"></Pagination>

</template>

<script>
  import axios from 'axios';
  import PostCard from '../components/PostCard.vue';  
  import PostCategory from '../components/PostCategory.vue';
  import Pagination from '../components/Pagination.vue';

  export default {
    name: 'PostView',
    components: {
      PostCategory,
      PostCard,
      Pagination,
    },
    data() {
      return {
        posts: [],
        totalPosts: 0,
        categorySelected: 'all',
        isLoading: false,
      }
    },
    computed: {
      currentPage(){
        return parseInt(this.$route.params.pageNumber) || 1;
      },
    },
    watch: {
      categorySelected(){
        this.$router.push({ path: `/post/page1` });
        this.getPosts();
      },
      currentPage(){
        this.getPosts();
      }
    },
    methods: {
      getPosts(){
        this.isLoading = true;
        const category = !this.categorySelected || this.categorySelected == 'all' ? '' : '&category=' + this.categorySelected;
        axios.get(`${import.meta.env.VITE_URL_API}/post?page=${this.currentPage}${category}`)
          .then(res => {
            this.posts = res.data;
            this.totalPosts = res.data.count;
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.isLoading = false;
          })
      },
      changePageNumber(pageNumber){
        this.$router.push({ path: `/post/page${pageNumber}` });        
      },
    },
    created() {
      this.getPosts();
    }
  }
</script>

<style lang="scss" scoped>

</style>