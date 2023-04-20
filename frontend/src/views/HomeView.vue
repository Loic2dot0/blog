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

  <div class="card-container">
    <p v-if="isLoading">chargement des articles en cours...</p>
    <p v-else-if="posts.count == 0">Aucun article</p>
    <p v-else>
      <div class="card" v-for="(post, index) in posts.rows" :key="index">
        <div class="card__picture">
          <img v-if="post.picture" :src="post.picture" alt="">
          <img v-else src="../assets/images/default-thumbnail.jpg" alt="">
        </div>
        <div class="card__content">
          <p class="card__date">{{ post.updatedAt }}</p>
          <h3 class="card__title">{{ post.title }}</h3>
          <p class="card__category" v-if="post.id_category == null">sans catégorie</p>
          <p class="card__category" v-else>{{ post.Post_Category.category }}</p>
          <div class="card__description" v-html="post.content"></div>
          <p class="card__button"><RouterLink :to="{name: 'post', params: {id_post: post.id_post}}" class="button">Voir la suite</RouterLink></p>
        </div>
      </div>
    </p>
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
  import { RouterLink } from 'vue-router';
  import axios from 'axios';

  export default {
    name: 'HomeView',
    data() {
      return {
        categories: [],
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
        this.$router.push({ path: `/page1` });
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
        this.$router.push({ path: `/page${pageNumber}` });        
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
      this.getCategories();
      this.getPosts();
    }
  }
</script>

<style lang="scss" scoped>

</style>