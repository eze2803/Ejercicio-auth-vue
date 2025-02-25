<template>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email </label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model="email">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
            </div>

            <button type="submit" class="btn btn-primary" @click.prevent="authUser">Submit</button>
        </form>
        <router-link :to="{ name: 'register' }">Create account</router-link>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AuthService from '../services/AuthServices';
import { useRouter } from 'vue-router';

let email = ref('');
let password = ref('');
let router = useRouter();

const authUser = async () => {
    const auth = new AuthService();
    const success = await auth.login(email.value, password.value);
    if (success) {
        router.push({ name: 'consultar' })
    } else {
        alert('login failed');
    }
}

</script>

<style scoped>
.container {
    width: 400px;
    height: 400px;
    background-color: rgb(173, 236, 241);
}
</style>