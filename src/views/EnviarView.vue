<template>
    <div class="form-floating mb-3">
        <input v-model="content" type="text" placeholder="escibe la nota" clear>
        <button @click.prevent="sendNote" type="submit">Enviar nota</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SendNote from '../services/SendNoteService';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
let content = ref('')

const sendNote = async () => {
    if (!authStore.getToken()) { // ✅ Verifica si hay un token
        alert("No estás autenticado");
        return;
    }
    const send = new SendNote();
    const succes = await send.send(content.value)
    console.log(succes)
    if (succes) {
        alert("nota enviada");
    } else {
        alert("error");
    }
}

</script>


<style scoped></style>