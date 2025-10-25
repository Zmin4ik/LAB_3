<template>
  <div class="orders">
    <h1>Orders</h1>
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    <button @click="logout">Logout</button>
    <ul>
      <li v-for="o in orders" :key="o.id">
        <router-link :to="{ name: 'orderView', params: { id: o.id } }">
          {{ o.title }} — {{ o.amount }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import mockApi from '@/services/mockApi'
import useAuth from '@/composables/useAuth'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'OrdersList',
  setup() {
    const orders = ref<Array<{ id: number; title: string; amount: number }>>([])
    const { logout } = useAuth()
    const route = useRoute()
    const errorMsg = ref<string | null>(null)

    onMounted(async () => {
      try {
        if (route.query.error === 'invalid-id') {
          errorMsg.value = 'Невірний ID — показано список замовлень.'
        }

        const result = await mockApi.fetchOrders()
        orders.value = result
      } catch (err: any) {
        errorMsg.value = 'Помилка під час отримання замовлень'
        console.error(err)
      }
    })

    return { orders, logout, errorMsg }
  }
})
</script>