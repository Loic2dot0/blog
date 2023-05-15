<template>
    <h2>Éditeur</h2>

    <form class="form-admin">
        <div class="form-admin__group">
            <label for="title">Titre de l'article</label>
            <input type="text" id="title" v-model="post.title">
        </div>
        <div class="form-admin__group">
            <label for="picture">Image de couverture</label>
            <div class="form-admin__inputmedia">
                <input type="text" id="picture" v-model="post.picture" disabled>
                <button type="button" class="button">Choisir une image</button>
            </div>
        </div>
        <div class="form-admin__group" v-if="categories.length != 0">
            <label for="category">Catégorie</label>
            <select name="category" id="category" v-model="post.id_category">
                <option v-for="(category, index) in categories" :key="index" :value="category.id_category">
                    {{ category.category }}
                </option>
                <option value="null">Sans catégorie</option>
            </select>
        </div>
        <div class="form-admin__group">
            <label for="publish">Statut</label>
            <select name="publish" id="publish" v-model="post.publish">
                <option value="true">Publier</option>
                <option value="false">Brouillon</option>
            </select>
        </div>
        <div class="form-admin__group">
            <label for="content">Contenu de l'article</label>
            <textarea name="content" id="content" cols="30" rows="10" v-model="post.content"></textarea>
        </div>
        <div class="form-admin__submit">
            <button type="submit" class="button">Enregister</button>
        </div>
        
    </form>

    <h2>Aperçu de l'article</h2>

    <article class="post post-preview">
        <div class="post-preview__picture">
            <button type="button" class="button" @click="togglePicture = !togglePicture">
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
                <p class="meta__category" v-if="post.id_category && post.id_category != 'null'">{{ getCategoryName(post.id_category) }}</p>
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
                    publish: 'false',
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
            getCategoryName(id) {
                const category = this.categories.find(category => category.id_category === id);
                return category.category;
            }
        },
        created() {
            this.getCategories();
        }
    }
</script>

<style lang="scss" scoped>

</style>