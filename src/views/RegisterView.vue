<template>
    <div class="container">
        <form action="">
            <input v-model="name" type="text" placeholder="name">
            <input v-model="email" type="email" placeholder="email">
            <input v-model="password" type="password" placeholder="password">
            <button type="submit" @click.prevent="regUser">send</button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RegisterService from '../services/RegisterService';

let name = ref('')
let email = ref('')
let password = ref('')

const regUser = async () => {
    const reg = new RegisterService();
    const success = await reg.regFunc(name.value, email.value, password.value);
    console.log(success)
    if (success) {
        alert('register success');
    } else {
        alert('register failed')
    }
}


</script>


<style scoped></style>