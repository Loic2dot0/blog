<template>
    <div v-if="isLoading" class="loading">chargement de l'article en cours... <span class="loading__spinner"></span></div>
    <p v-else-if="error" class="alert alert--error">Oups... Une erreur est survenue</p>
    <article v-else class="post">
        <div class="post__picture">
            <img v-if="post.picture" :src="post.picture" alt="">
            <img v-else src="../assets/images/default-thumbnail.jpg" alt="">
        </div>

        <h2>{{ post.title }}</h2>

        <div class="post__info">
            <div class="author">
                <img v-if="post.id_user && post.User.avatar" :src="post.User.avatar" alt="" class="author__avatar">
                <svg v-else class="author__avatar author__avatar--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"/>
                </svg>
                <p class="author__name" v-if="post.id_user">{{ post.User.name }}</p>
                <p class="author__name" v-else>Auteur anonyme</p>
            </div>
            <div class="meta">
                <p class="meta__date">Publié le {{ formatDate(post.updatedAt) }}</p>
                <p class="meta__category" v-if="post.id_category">{{ post.Post_Category.category }}</p>
                <p class="meta__category" v-else>Sans catégorie</p>
            </div>
        </div>

        <div class="post__content" v-html="post.content"></div>

        <p class="post__button">
            <button @click="$router.back()" type="button" class="button">retour aux articles</button>
        </p>
    </article>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'PostView',
        data() {
            return {
                post: {},
                isLoading: false,
                error: null
            }
        },
        methods: {
            getPost(){
                this.error = null;
                this.isLoading = true;
                axios.get(`${import.meta.env.VITE_URL_API}/post/${this.$route.params.id_post}`)
                    .then(res => {
                        this.post = res.data;
                    })
                    .catch(error => {
                        this.error = error;
                        console.error(error)
                    })
                    .finally(() => {
                        this.isLoading = false;
                    })
            },
            formatDate(date){
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(date).toLocaleDateString('fr-FR', options);
            }
        },
        created(){
            this.getPost();
        }
    }
</script>

<style lang="scss" scoped>

</style>