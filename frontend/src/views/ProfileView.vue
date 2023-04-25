<template>
  <h2>Mon Profil</h2>

  <button @click="logout">Logout</button>
</template>

<script>
  export default {
    name: 'ProfileView',
    data() {
      return {

      }
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push('/login');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>