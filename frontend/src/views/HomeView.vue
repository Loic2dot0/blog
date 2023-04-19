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
  
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'HomeView',
    data() {
      return {
        categories: [],
        posts: [],
        categorySelected: null,
        page: 1,
        isLoading: false
      }
    },
    watch: {
      categorySelected(){
        this.page = 1;
        this.getPosts()
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
        axios.get(`${import.meta.env.VITE_URL_API}/post?page=${this.page}${this.categorySelected && this.categorySelected != 'null' ? '&category=' + this.categorySelected : ''}`)
          .then(res => {
            this.posts = res.data
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
      this.getCategories();
      this.getPosts();
    }
  }
</script>

<style lang="scss" scoped>

</style>