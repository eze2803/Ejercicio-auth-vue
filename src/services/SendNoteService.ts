import { Ref, ref } from "vue"
import { useAuthStore } from "@/store/auth";
class SendNote {
    private error: Ref<string>

    constructor() {
        this.error = ref('');
    }
    getError(): Ref<string> {
        return this.error;
    }

    async send(content: string): Promise<boolean> {
        try {
            const authStore = useAuthStore();
            const token = authStore.getToken();

            if (!token) {
                console.log("Error: No hay token de autenticación.");
                this.error.value = "Usuario no autenticado";
                return false;
            }
            const res = await fetch('http://127.0.0.1:8000/api/note', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: content
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

export default SendNote
