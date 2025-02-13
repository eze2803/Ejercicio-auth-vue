import ConsultarView from '@/views/ConsultarView.vue'
import EnviarView from '@/views/EnviarView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store/auth'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/enviar',
    name: 'enviar',
    component: EnviarView,
    meta: { requiresAuth: true }

  },
  {
    path: '/consultar',
    name: 'consultar',
    component: ConsultarView,
    meta: { requiresAuth: true }
  }





]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login'); // ✅ Redirige al login si no está autenticado
  } else {
    next(); // ✅ Permite la navegación
  }
});

export default router
