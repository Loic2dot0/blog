<template>
    <h2>Éditeur</h2>

   

    <article class="post post-preview">
        <div class="post-preview__picture">
            <button class="button" @click="togglePicture = !togglePicture">
                <span v-if="togglePicture">Masquer l'image</span>
                <span v-else>Afficher l'image</span>
            </button>
            <div v-if="togglePicture" class="post__picture">
                <img v-if="post.picture" :src="post.picture" alt="">
                <img v-else src="../assets/images/default-thumbnail.jpg" alt="">
            </div>
        </div>
        

        <h2>{{ post.title }}</h2>

        <div class="post__info">
            <div class="author">
                <img v-if="avatar" :src="avatar" alt="" class="author__avatar">
                <svg v-else class="author__avatar author__avatar--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"/>
                </svg>
                <p class="author__name" v-if="name">{{ name }}</p>
                <p class="author__name" v-else>Auteur anonyme</p>
            </div>
            <div class="meta">
                <p class="meta__date">Publié le {{ formatDate(new Date) }}</p>
                <p class="meta__category" v-if="post.id_category">{{ post.id_category }}</p>
                <p class="meta__category" v-else>Sans catégorie</p>
            </div>
        </div>

        <div class="post__content" v-html="post.content"></div>
    </article>
</template>

<script>
    import axios from 'axios';
    import { useUserStore } from '../stores/user';
    import { mapState } from 'pinia';

    export default {
        name: "AdminPostWriteView",
        data() {
            return {
                post: {
                    picture: null,
                    title: null,
                    content: null,
                    id_category: null,
                },
                categories: [],
                togglePicture: true,
            }
        },
        computed: {
            ...mapState(useUserStore, ['userId', 'userToken', 'name', 'avatar']),
        },
        methods: {
            formatDate(date) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(date).toLocaleDateString('fr-FR', options);
            },
            getCategories(){
                axios.get(`${import.meta.env.VITE_URL_API}/postcategory`)
                    .then(res => {
                        this.categories = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
        },
        created() {
            this.getCategories();
        }
    }
</script>

<style lang="scss" scoped>

</style>