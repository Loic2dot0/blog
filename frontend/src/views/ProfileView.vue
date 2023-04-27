<template>
  <h2>Mon Profil</h2>

  <div class="profile-container">
    <aside class="profile-view">
      <div class="profile-card">
        <img v-if="avatar" :src="avatar" :alt="`avatar de ${name}`" class="profile-card__avatar">
        <svg v-else class="profile-card__avatar profile-card__avatar--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"/>
        </svg>
        <p class="profile-card__name">{{ name }}</p>
      </div>
      
      <button @click="logout" class="button button--danger">Me déconnecter</button>
    </aside>

    <div class="profile-option">
      <div class="alert alert--error" v-if="errorGlobal">Oups... Une erreur est survenue.</div>
      <div class="alert alert--success" v-if="success">Profil modifié</div>

      <h3>Modifier mon profil</h3>

      <form class="profile-option__form">
        <div class="profile-option__form__group">
          <label for="name">Nom</label>
          <input type="text" id="name" v-model="userName" :class="{error: errorName}">
          <div class="alert alert--error" v-if="errorMessage">{{ errorMessage }}</div>
        </div>
        <div class="profile-option__form__group">
          <label for="avatar">Avatar</label>
          <input
            type="file"
            ref="file"
            id="avatar"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            @change="handleFileUpload()"
          >
        </div>
        <button type="submit" class="button" @click="handleForm" >Mettre à jour</button>
      </form>

      <div class="profile-option__delete">
        <h3>Supprimer mon compte</h3>

        <p>Attention, cette action est irréversible.</p>
        
        <button class="button button--danger" @click="modalConfirm = true">Supprimer mon compte</button>
      </div>
    </div>
  </div>
  
  <ModalConfirm v-if="modalConfirm" title="Supprimer mon compte ?" @confirm="deleteAccount" @cancel="modalConfirm = false" />
</template>

<script>
  import axios from 'axios';
  import { useUserStore} from '../stores/user';
  import { mapState } from 'pinia';
  import { mapActions } from 'pinia';
  import ModalConfirm from '../components/ModalConfirm.vue';

  export default {
    name: 'ProfileView',
    components: {
      ModalConfirm
    },
    data() {
      return {
        userName: null,
        file: null,
        errorName: false,
        errorMessage: null,
        errorGlobal: false,
        success: false,
        modalConfirm: false,
      }
    },
    computed: {
      ...mapState(useUserStore, ['userId','token', 'name', 'avatar']),
    },
    watch: {
      name: {
        immediate: true,
        handler(val){
          this.userName = val;
        }
      }
    },
    methods: {
      ...mapActions(useUserStore, ['getUser', 'logout']),
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
      handleForm(e){
        e.preventDefault();

        this.errorName = false;
        this.errorMessage = null;
        this.errorGlobal = false;
        this.success = false;

        if(this.userName.length < 3){
          this.errorName = true;
          this.errorMessage = 'Le nom doit contenir au moins 3 caractères';
          return;
        }

        const formData = new FormData();
        formData.append('name', this.userName);
        formData.append('avatar', this.file);
        
        const headers = {
          "userid" : this.userId,
          "Authorization" : `Bearer ${this.token}`,
          "Content-Type": "multipart/form-data"
        };

        axios.put(`${import.meta.env.VITE_URL_API}/user`, formData, {
            headers
          })
          .then(res => {
            this.success = true;
            this.getUser();
          })
          .catch(err => {
            this.errorGlobal = true;
          })
      },
      deleteAccount(){
        this.modalConfirm = false;
        this.errorGlobal = false;

        axios.delete(`${import.meta.env.VITE_URL_API}/user`, {
            headers: {
              "userid" : this.userId,
              "Authorization" : `Bearer ${this.token}`,
            }
          }).then(res => {
            this.logout();
            this.errorGlobal = true;
          }).catch(err => {
            this.errorGlobal = true;
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>