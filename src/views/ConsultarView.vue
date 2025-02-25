<template>
    <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div class="card shadow p-4 w-75">
            <h2 class="text-center mb-4">Lista de Notas</h2>
            <div v-if="notes.length">
                <table class="table table-striped text-center">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="note in notes" :key="note.id">
                            <th scope="row">{{ note.id }}</th>
                            <td>{{ note.content }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p v-else class="text-center text-muted">No hay notas disponibles</p>
            <div class="d-flex justify-content-between mt-4">
                <router-link :to="{ name: 'enviar' }" class="btn btn-primary">Crear notas</router-link>
                <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue';
import ConsNote from '../services/ConsService';
import { useAuthStore } from '../store/auth';
import INote from '../interfaces/INote';
import router from '@/router';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
const notes: Ref<Array<INote>> = ref([]);
const error = ref('');
const noteService = new ConsNote();

const consNote = async () => {
    const success = await noteService.cons();
    if (success) {
        notes.value = noteService.getNotes().value;
    } else {
        error.value = noteService.getError().value;
    }
}

onMounted(() => {
    consNote();
});

const logout = () => {
    authStore.token = null;
    router.push({ name: 'login' });
};
</script>

<style scoped>
.card {
    max-width: 600px;
    width: 100%;
    border-radius: 15px;
}

.table {
    border-radius: 10px;
    overflow: hidden;
}

button,
a {
    min-width: 120px;
}
</style>