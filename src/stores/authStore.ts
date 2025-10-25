import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/types'

const STORAGE_KEY = 'oms_token'
const STORAGE_USER = 'oms_user'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem(STORAGE_KEY))
    const user = ref<User | null>(
        localStorage.getItem(STORAGE_USER) ? JSON.parse(localStorage.getItem(STORAGE_USER)!) : null
    )

    function setAuth(newToken: string, newUser: User) {
        token.value = newToken
        user.value = newUser
        localStorage.setItem(STORAGE_KEY, newToken)
        localStorage.setItem(STORAGE_USER, JSON.stringify(newUser))
    }

    function clearAuth() {
        token.value = null
        user.value = null
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(STORAGE_USER)
    }

    const isAuthenticated = () => !!token.value

    return { token, user, setAuth, clearAuth, isAuthenticated }
})