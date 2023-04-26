<template>
    <header>
        <h1>
            <RouterLink to="/" >Le Blog</RouterLink>
        </h1>
        <input type="checkbox" id="btn-nav">
        <label for="btn-nav" class="nav__button" title="bouton de menu"><span></span></label>

        <nav class="nav">
            <RouterLink to="/post" class="nav__link">Articles</RouterLink>
            <RouterLink to="/photos" class="nav__link">Photos</RouterLink>
            <RouterLink to="/videos" class="nav__link">Videos</RouterLink>
            <RouterLink to="/about" class="nav__link">A propos</RouterLink>
            <RouterLink v-if="!isLogged" to="/login" class="nav__link">Login</RouterLink>
            <RouterLink v-else to="/profile" title="Aller sur mon profil" class="nav__link nav__link--profile">
                <span>Mon profil</span>
                <img v-if="avatar" :src="avatar" alt="" class="nav__avatar">
                <svg v-else class="nav__avatar nav__avatar--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"/>
                </svg>
            </RouterLink>
        </nav>
    </header>
</template>

<script>
    import { RouterLink } from 'vue-router';
    
    import { useUserStore} from '../stores/user';
    import { mapState } from 'pinia';
    import { mapActions} from 'pinia';

    export default {
        name: 'TheHeader',
        data() {
            return {
               
            }
        },
        computed: {
            ...mapState(useUserStore, ['userId', 'token', 'avatar']),
            isLogged() {
                return this.userId && this.token ? true : false;
            },
        },
        watch: {
            userId() {
                this.getUser();
            },
            token() {
                this.getUser();
            }
        },
        methods: {
            ...mapActions(useUserStore, ['getUser']),
        },
        created() {
            this.getUser();
        },
    }
</script>

<style lang="scss" scoped>

</style>