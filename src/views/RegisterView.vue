<template>
    <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div class="card shadow p-4 w-50 text-center">
            <h2 class="mb-4">Registro</h2>
            <form @submit.prevent="regUser">
                <div class="mb-3 text-start">
                    <label for="name" class="form-label">Nombre</label>
                    <input class="form-control" v-model="name" type="text" id="name">
                </div>
                <div class="mb-3 text-start">
                    <label for="email" class="form-label">Email</label>
                    <input class="form-control" v-model="email" type="email" id="email">
                </div>
                <div class="mb-3 text-start">
                    <label for="password" class="form-label">Password</label>
                    <input class="form-control" v-model="password" type="password" id="password">
                </div>
                <button class="btn btn-primary w-100" type="submit">Registrar</button>
            </form>
            <router-link :to="{ name: 'login' }" class="btn btn-secondary w-100 mt-2">Iniciar Sesión</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RegisterService from '../services/RegisterService';
import router from '@/router';

let name = ref('');
let email = ref('');
let password = ref('');

const regUser = async () => {
    const reg = new RegisterService();
    const success = await reg.regFunc(name.value, email.value, password.value);
    console.log(success);
    if (success) {
        router.push({ name: 'login' });
    } else {
        alert('Registro fallido');
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
