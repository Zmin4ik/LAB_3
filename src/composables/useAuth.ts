import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import mockApi from '@/services/mockApi'

export default function useAuth() {
    const store = useAuthStore()
    const router = useRouter()

    async function login(username: string, password: string) {
        const res = await mockApi.login(username, password)

        if (res.ok && res.token && res.user) {
            store.setAuth(res.token, res.user)
            await router.push({ name: 'ordersList' })
        } else {
            throw new Error(res.message || 'Помилка входу')
        }
    }

    function logout() {
        store.clearAuth()
        router.push({ name: 'auth' })
    }

    return { login, logout, store }
}