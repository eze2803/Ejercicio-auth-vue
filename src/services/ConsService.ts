import { Ref, ref } from "vue";
import { useAuthStore } from "../store/auth";

class ConsNote {
    private notes: Ref<any[]>;
    private error: Ref<string>

    constructor() {
        this.notes = ref([]);
        this.error = ref('');
    }
    getNotes(): Ref<any[]> {
        return this.notes;
    }
    getError(): Ref<string> {
        return this.error;
    }
    async cons(): Promise<boolean> {
        try {
            const authStore = useAuthStore();
            const token = authStore.getToken();

            if (!token) {
                this.error.value = "Usuario no autenticado";
                return false;
            }
            const res = await fetch('http://127.0.0.1:8000/api/note', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
}

export default ConsNote