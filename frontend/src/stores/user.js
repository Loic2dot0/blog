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
                    if(res.data){
                        this.name = res.data.name;
                        this.avatar = res.data.avatar;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },    
        async login({email, password}){
            try{
                const res = await axios.post(`${import.meta.env.VITE_URL_API}/user/login`, {
                    email,
                    password
                });
                
                if(!res.data.userId || !res.data.token) throw new Error('Une erreur est survenue.');
                
                this.userId = res.data.userId;
                this.token = res.data.token;
                localStorage.setItem('user', JSON.stringify({userId: this.userId, token: this.token}));
                return { message : 'logged'};
                
            } catch(err){
                return { error: err.response.status == 401 ? 'Identifiant ou mot de passe incorrect' : 'Une erreur est survenue.'};
            }
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