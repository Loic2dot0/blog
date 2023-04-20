<template>
  <h2>Articles</h2>

  <div class="category" v-if="categories.length != 0">
    <label for="category">Catégorie : </label>
    <select name="category" id="category" v-model="categorySelected">
      <option value="null">Toutes</option>
      <option v-for="(category, index) in categories" :key="index" :value="category.id_category">
        {{ category.category }}
      </option>
    </select>
  </div>

  <p v-if="isLoading">chargement des articles en cours...</p>
  <p v-else-if="posts.count == 0">Aucun article</p>
  <p v-else>{{ posts }}</p>

  <div class="pagination">
    <button 
      type="button"
      class="pagination__button"
      :class="{active: currentPage == pageNumber}"
      v-for="pageNumber in numberOfPages"
      :key="pageNumber"
      @click="changePageNumber(pageNumber)"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'HomeView',
    data() {
      return {
        categories: [],
        posts: [],
        totalPosts: 0,
        categorySelected: null,
        isLoading: false,
      }
    },
    computed: {
      numberOfPages(){
        return Math.ceil(this.totalPosts / 10);
      },
      currentPage(){
        return parseInt(this.$route.params.pageNumber) || 1;
      }
    },
    watch: {
      categorySelected(){
        this.getPosts();
      },
      currentPage(){
        this.getPosts();
      }
    },
    methods: {
      getCategories(){
        axios.get(`${import.meta.env.VITE_URL_API}/postcategory`)
          .then(res => {
            this.categories = res.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      getPosts(){
        this.isLoading = true;
        const category = this.categorySelected && this.categorySelected != 'null' ? '&category=' + this.categorySelected : '';
        axios.get(`${import.meta.env.VITE_URL_API}/post?page=${this.currentPage, category}`)
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
        this.$router.push({ path: `/page${pageNumber}` });        
      }
    },
      created() {
      this.getCategories();
      this.getPosts();
    }
  }
</script>

<style lang="scss" scoped>

</style>