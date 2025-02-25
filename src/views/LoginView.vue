<template>
    <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div class="card shadow p-4 w-50 text-center">
            <h2 class="mb-4">Iniciar Sesión</h2>
            <form @submit.prevent="authUser">
                <div class="mb-3 text-start">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="email">
                </div>
                <div class="mb-3 text-start">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary w-100">Submit</button>
            </form>
            <router-link :to="{ name: 'register' }" class="btn btn-secondary w-100 mt-2">Crear cuenta</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AuthService from '../services/AuthServices';
import { useRouter } from 'vue-router';

let email = ref('');
let password = ref('');
let router = useRouter();

const authUser = async () => {
    const auth = new AuthService();
    const success = await auth.login(email.value, password.value);
    if (success) {
        router.push({ name: 'consultar' });
    } else {
        alert('Login failed');
    }
};
</script>

<style scoped>
.card {
    max-width: 400px;
    width: 100%;
    border-radius: 15px;
}

.form-control {
    border-radius: 10px;
}

button,
a {
    min-width: 120px;
}
</style>
