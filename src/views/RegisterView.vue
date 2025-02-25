<template>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="name" class="form-label"> Name</label>
                <input class="form-control" v-model="name" type="text" id="name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input class="form-control" v-model="email" type="email" id="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input class="form-control" v-model="password" type="password" id="password">
            </div>
            <button class="btn btn-primary" type="submit" @click.prevent="regUser">send</button>
        </form>
        <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RegisterService from '../services/RegisterService';
import router from '@/router';

let name = ref('')
let email = ref('')
let password = ref('')

const regUser = async () => {
    const reg = new RegisterService();
    const success = await reg.regFunc(name.value, email.value, password.value);
    console.log(success)
    if (success) {
        router.push({ name: 'login' })
    } else {
        alert('register failed')
    }
}


</script>


<style scoped>
.container {
    width: 400px;
    height: 400px;
    background-color: rgb(173, 236, 241);

    &.form-control {
        padding: 20px;
    }
}
</style>