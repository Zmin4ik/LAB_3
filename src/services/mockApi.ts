import type { User, Order } from '../types/types'

const VALID_CREDENTIALS = { username: 'admin', password: 'password' }

const mockApi = {
    async login(
        username: string,
        password: string
    ): Promise<{ ok: boolean; token?: string; user?: User; message?: string }> {
        await new Promise(r => setTimeout(r, 300))
        if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
            return {
                ok: true,
                token: 'fake-jwt-token',
                user: { id: 1, name: 'Admin', email: 'admin@example.com' }
            }
        }
        return { ok: false, message: 'Невірний логін або пароль' }
    },

    async fetchOrders(): Promise<Order[]> {
        await new Promise(r => setTimeout(r, 200))
        return Array.from({ length: 8 }, (_, i) => ({
            id: 100 + i,
            title: `Order #${100 + i}`,
            amount: (i + 1) * 10
        }))
    },

    async fetchOrder(id: number): Promise<Order> {
        await new Promise(r => setTimeout(r, 150))
        return { id, title: `Order #${id}`, amount: (id % 10) * 10 }
    }
}

export default mockApi
