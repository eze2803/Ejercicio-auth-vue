<template>
    <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div class="card shadow p-4 w-50 text-center">
            <h2 class="mb-4">Agregar Nota</h2>
            <input v-model="content" type="text" class="form-control mb-3" placeholder="Escribe la nota">
            <button @click="sendNote" type="submit" class="btn btn-primary w-100 mb-2">Enviar nota</button>
            <router-link :to="{ name: 'consultar' }" class="btn btn-secondary w-100">Consultar notas</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SendNote from '../services/SendNoteService';
import { useAuthStore } from '../store/auth';
import router from '@/router';

const authStore = useAuthStore();
let content = ref('');

const sendNote = async () => {
    if (!authStore.getToken()) {
        alert("No estás autenticado");
        return;
    }
    const send = new SendNote();
    const succes = await send.send(content.value);
    console.log(succes);
    if (succes) {
        alert("Nota enviada");
        router.push({ name: 'consultar' });
    } else {
        alert("Error");
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
