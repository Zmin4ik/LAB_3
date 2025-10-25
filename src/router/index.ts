import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/components/AuthView.vue'
import OrdersList from '@/components/OrdersList.vue'
import OrderView from '@/components/OrderView.vue'
import NotFound from '@/components/NotFound.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
    { path: '/auth', name: 'auth', component: AuthView },
    { path: '/orders', name: 'ordersList', component: OrdersList, meta: { requiresAuth: true } },
    { path: '/order', redirect: '/order/101' },
    { path: '/order/:id', name: 'orderView', component: OrderView, meta: { requiresAuth: true } },
    { path: '/not-found', name: 'notFound', component: NotFound },
    { path: '/:catchAll(.*)', redirect: '/not-found' }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    const requiresAuth = to.meta?.requiresAuth

    if (requiresAuth && !auth.isAuthenticated()) {
        return next({ name: 'auth' })
    }

    if (to.name === 'orderView') {
        const idParam = to.params.id
        const id = typeof idParam === 'string' ? Number(idParam) : NaN
        if (Number.isNaN(id) || id < 100) {
            return next({ name: 'ordersList', query: { error: 'invalid-id' } })
        }
    }

    next()
})

export default router
