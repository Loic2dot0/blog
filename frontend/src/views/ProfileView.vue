<template>
  <h2>Mon Profil</h2>

  <button @click="logout" class="button">Me déconnecter</button>
</template>

<script>
  import { useUserStore} from '../stores/user';
  import { mapActions } from 'pinia';

  export default {
    name: 'ProfileView',
    data() {
      return {

      }
    },
    methods: {
      ...mapActions(useUserStore, ['logout']),
    }
  }
</script>

<style lang="scss" scoped>

</style>