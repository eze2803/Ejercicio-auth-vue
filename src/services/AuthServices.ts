import { ref, Ref } from "vue";
import { useAuthStore } from "../store/auth";
class AuthService {
    private token: Ref<string>;
    private error: Ref<string>;

    constructor() {
        this.token = ref('');
        this.error = ref('');
    }
    getToken(): Ref<string> {
        return this.token;
    }
    getError(): Ref<string> {
        return this.error;
    }
    async login(email: string, password: string): Promise<boolean> {

        try {
            const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
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

}
export default AuthService;