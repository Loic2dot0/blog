<template>
  <h2>Articles</h2>

  <PostCategory @categorySelected="categorySelected = $event"></PostCategory>

  <div class="card-container">
    <div v-if="isLoading" class="loading">chargement des articles en cours... <span class="loader"></span></div>
    <p v-else-if="posts.rows.length == 0" class="alert">Aucun article</p>
    <PostCard v-else v-for="(post, index) in posts.rows" :key="index" :post="post"></PostCard>
  </div>  

  <div class="pagination">
    <button type="button" class="button" @click="showPrevPages" v-if="selectedPages != 0">&lt;</button>
    <button 
      type="button"
      class="button"
      :class="{active: currentPage == pageNumber}"
      v-for="pageNumber in pagesArray[selectedPages]"
      :key="pageNumber"
      @click="changePageNumber(pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <button type="button" class="button" @click="showNextPages" v-if="selectedPages < pagesArray.length - 1">></button>
  </div>
</template>

<script>
  import axios from 'axios';
  import PostCard from '../components/PostCard.vue';  
  import PostCategory from '../components/PostCategory.vue';

  export default {
    name: 'PostView',
    components: {
      PostCategory,
      PostCard,
    },
    data() {
      return {
        posts: [],
        totalPosts: 0,
        selectedPages: 0,
        categorySelected: null,
        isLoading: false,
      }
    },
    computed: {
      totalPages(){
        return Math.ceil(this.totalPosts / 10);
      },
      currentPage(){
        return parseInt(this.$route.params.pageNumber) || 1;
      },
      pagesArray(){
        const pagesArray = [];
        for (let i = 1; i <= this.totalPages; i+=5) {
          let array = [];
          for (let j = i; j < i + 5 && j <= this.totalPages; j++) {
            array.push(j);
          }
          pagesArray.push(array);
        }
        return pagesArray;
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
        const category = this.categorySelected && this.categorySelected != 'null' ? '&category=' + this.categorySelected : '';
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
      showPrevPages(){
       if(this.selectedPages == 0) return;
        this.selectedPages--;
      },
      showNextPages(){
        if(this.selectedPages == this.pagesArray.length - 1) return;
        this.selectedPages++;
      }
    },
      created() {
      this.getPosts();
    }
  }
</script>

<style lang="scss" scoped>

</style>