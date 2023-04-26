import { defineStore} from 'pinia';
import router from '../router';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({ // data
        userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userId : null,
        token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
        name: null,
        avatar: null,

    }),
    getters: { // computed properties

    },
    actions: { // methods
        getUser(){
            if(!this.userId || !this.token) return;

            const headers = {
                "userid" : this.userId,
                "Authorization" : `Bearer ${this.token}`
            };
            axios.get(`${import.meta.env.VITE_URL_API}/user`, { 
                    headers
                })
                .then(res => {
                    if(res.data.name && res.data.avatar){
                        this.name = res.data.name;
                        this.avatar = res.data.avatar;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },    
        saveUserSession(user) {
            this.userId = user.userId;
            this.token = user.token;
            localStorage.setItem('user', JSON.stringify({userId: this.userId, token: this.token}));
        },
        logout() {
            this.userId = null;
            this.token = null;
            this.name = null;
            this.avatar = null;
            localStorage.clear();
            router.push('/login');
        }
    },
});