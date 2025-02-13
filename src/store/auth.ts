import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);

    const setToken = (newToken: string) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    };

    const getToken = () => {
        return token.value || localStorage.getItem('token');
    }
    const clearToken = () => {
        token.value = null;
        localStorage.removeItem('token'); // ✅ Eliminar token al cerrar sesión
    };
    const isAuthenticated = computed(() => !!token.value);
    return { token, setToken, getToken };
});