<template>
    
        <h2>Dashboard</h2>

        <div class="dashboard-nav">
            <RouterLink v-if="$route.name != 'dashboard'" to="/dashboard" class="btn-dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                </svg>
                <span>Dashboard</span>
            </RouterLink>
            <RouterLink to="/dashboard/post/write" class="btn-dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                </svg>
                <span>Écrire un article</span>
            </RouterLink>
            <RouterLink to="/dashboard/post" class="btn-dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
                </svg>
                <span>Voir tous les articles</span>
            </RouterLink>
        </div>

    <div v-if="$route.name == 'dashboard'">
        <p>Article(s) en attente de publication : <strong>{{ posts.length }}</strong></p>

        <div v-if="isLoadingPosts" class="loading">
            Chargement des articles en cours...
            <span class="loading__spinner"></span>
        </div>
        <div v-else-if="errorPosts">
            <p class="alert alert--error">Oups... Une erreur est survenue</p>
        </div>
        <table v-else-if="posts.length > 0" class="dashboard-table">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id_post">
                    <td class="dashboard-table__title">
                        {{ post.title }}
                    </td>
                    <td class="dashboard-table__category">
                        {{ showCategory(post) }}
                    </td>
                    <td class="dashboard-table__action">
                        <button title="Publier" class="btn-action btn-action--success" @click="setStatusPublish(post.id_post)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>
                        <button title="Modifier" class="btn-action"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
                        <button title="Supprimer" class="btn-action btn-action--danger" @click="openModal(post.id_post, post.title)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button>
                    </td>
                </tr>
            </tbody>
        </table>

        <ModalConfirm v-if="modalConfirm" :title="modalTitle" @confirm="deletePost" @cancel="closeModal"></ModalConfirm>
    </div>

    <RouterView />
</template>

<script>
    import axios from 'axios';
    import ModalConfirm from '../components/ModalConfirm.vue';
    import { useUserStore} from '../stores/user';
    import { mapState } from 'pinia';

    export default {
        name: 'AdminDashboard',
        components: {
            ModalConfirm,
        },
        data() {
            return {
                posts : [],
                isLoadingPosts: false,
                errorPosts: null,
                modalConfirm: false,
                modalTitle: '',
                idPostToDelete: null,
            }
        },
        computed: {
            ...mapState(useUserStore, ['userId','token']),
        },
        methods: {
            getPosts(){
                this.errorPosts = null;
                this.isLoadingPosts = true;

                const headers = {
                    "userid" : this.userId,
                    "Authorization" : `Bearer ${this.token}`,
                };

                axios.get(`${import.meta.env.VITE_URL_API}/post/full?limit=25&publish=false`, {
                        headers
                    })
                    .then(res => {
                        this.posts = res.data.rows;
                    })
                    .catch(error => {
                        this.errorPosts = error;
                    })
                    .finally(() => {
                        this.isLoadingPosts = false;
                    })
            },
            showCategory(post){
                if(!post.id_category) {
                    return 'Sans catégorie';
                } else return post.Post_Category.category;
            },
            setStatusPublish(idPost){
                this.errorPosts = null;
    
                const headers = {
                    "userid" : this.userId,
                    "Authorization" : `Bearer ${this.token}`,
                };

                axios.put(`${import.meta.env.VITE_URL_API}/post/${idPost}`,{
                        publish: true
                    }, {
                        headers
                    })
                    .then(res => {
                        this.getPosts();
                    })
                    .catch(error => {
                        this.errorPosts = error;
                    })
            },
            openModal(idPost, title){
                this.modalConfirm = true;
                this.modalTitle = `Supprimer l'article : ${title}`;
                this.idPostToDelete = idPost;
            },
            closeModal(){
                this.modalConfirm = false;
                this.modalTitle = '';
                this.idPostToDelete = null;
            },
            deletePost(){
                this.errorPosts = null;
    
                const headers = {
                    "userid" : this.userId,
                    "Authorization" : `Bearer ${this.token}`,
                };

                axios.delete(`${import.meta.env.VITE_URL_API}/post/${this.idPostToDelete}`, {
                        headers
                    })
                    .then(res => {
                        this.getPosts();
                    })
                    .catch(error => {
                        this.errorPosts = error;
                    })
                    .finally(() => {
                        this.closeModal();
                    })
            }
        },
        created() {
            this.getPosts();
        }
    }
</script>

<style lang="scss" scoped>

</style>