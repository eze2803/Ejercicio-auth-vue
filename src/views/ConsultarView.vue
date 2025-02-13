<template>
    <div class="container">
        <h2>Mis Notas</h2>
        <button @click.prevent="consNote" type="submit"> Mostrar</button>
        <p v-if="error" class="error">{{ error }}</p>
        <ul v-if="notes.length">
            <li v-for="note in notes" :key="note.id">{{ note.content }}</li>
        </ul>
        <p v-else>No hay notas disponibles</p>
    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import ConsNote from '../services/ConsService';
import { useAuthStore } from '../store/auth';

const notes = ref<any[]>([]);
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
</script>


<style scoped></style>