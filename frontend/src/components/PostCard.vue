<template>
    <div class="card">
        <div class="card__picture">
          <img v-if="post.picture" :src="post.picture" alt="">
          <img v-else src="../assets/images/default-thumbnail.jpg" alt="">
        </div>
        <div class="card__content">
          <p class="card__date">{{ formatDate(post.updatedAt) }}</p>
          <h3 class="card__title"><RouterLink :to="{name: 'postone', params: {id_post: post.id_post}}">{{ post.title }}</RouterLink></h3>
          <p class="card__category" v-if="post.id_category == null">sans catégorie</p>
          <p class="card__category" v-else>{{ post.Post_Category.category }}</p>
          <div class="card__description" v-html="post.content"></div>
          <p class="card__button"><RouterLink :to="{name: 'postone', params: {id_post: post.id_post}}" class="button">Voir la suite</RouterLink></p>
        </div>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';

    export default {
        name: 'PostCard',
        props: {
            post: Object,
            required: true
        },
        methods:{
            formatDate(date){
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(date).toLocaleDateString('fr-FR', options);
            }
        },   
    }
</script>

<style lang="scss" scoped>

</style>