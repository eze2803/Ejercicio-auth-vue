import { Ref, ref } from "vue";

class RegisterService {
    private error: Ref<string>
    constructor() {
        this.error = ref('')
    }
    getError(): Ref<string> {
        return this.error;
    }
    async regFunc(name: string, email: string, password: string): Promise<boolean> {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/auth/register', {
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
            })
            const response = await res.json();
            if ('error' in response) {
                this.error.value = "register failed";
                console.log("Respuesta del servidor:", response);
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        } return false;

    }
}


export default RegisterService;