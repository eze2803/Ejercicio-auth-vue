import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);

    const setToken = (newToken: string) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    };

    const getToken = () => {
        return token.value || localStorage.getItem('token');
    }

    const isAuthenticated = computed(() => !!token.value);
    return { token, setToken, getToken };

});


/*
 const useAuthStore = defineStore ('auth', ()=> {
 state: () => {
 return {
    token: null,
    baseURL: 'http://127.0.0.1:8000/api'
    },
}
 actions: {
    async register(name: string, email: string, password: string): Promise<boolean>{
        const uri = ${this.baseURL}/auth/register
    },  const response = await fetch(uri,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
        }    
    })
     async login(email: string, password: string): Promise<boolean> {

        try {
            const uri = '${this.baseURL}/auth/login'
            const res = await fetch(uri, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const response = await res.json();
            if ('error' in response) {
                this.error.value = "login failes";
                return false;
            }
            const authStore = useAuthStore(); // ✅ Importamos el store de auth
            authStore.setToken(response.token); // ✅ Guardamos el token en Pinia

            this.token.value = response.token;
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }

},
    async getNotes() {
        const uri = '${this.baseURL}/note'
        const res = await fetch (uri,{
            method: 'GET',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
        })
                       const response = await res.json();
            if ('error' in response) {
                this.error.value = "Error to send note";
                return false;
            }
            this.notes.value = response;
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    },
    async createNote(){
         const uri = '${this.baseURL}/note'
        const res = await fetch (uri,{ 
            method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    'content': content
                })
            })
            const response = await res.json();
            if ('error' in response) {
                this.error.value = "Error to send note";
                return false;
            } return true
        } catch (error) {
            console.log(error);
            return false;
        }

    }
    }
 }   
 })
*/ 