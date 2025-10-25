<template>
  <div class="order">
    <h1>Order details</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="order">
      <p><strong>ID:</strong> {{ order.id }}</p>
      <p><strong>Title:</strong> {{ order.title }}</p>
      <p><strong>Amount:</strong> {{ order.amount }}</p>
    </div>
    <div v-else class="error">Not found</div>
    <router-link to="/orders">Back to orders</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import mockApi from '@/services/mockApi'

export default defineComponent({
  name: 'OrderView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const order = ref<{ id: number; title: string; amount: number } | null>(null)
    const loading = ref(true)

    onMounted(async () => {
      try {
        const idParam = route.params.id
        const id = typeof idParam === 'string' ? Number(idParam) : NaN

        if (Number.isNaN(id) || id < 100) {
          await router.replace({ name: 'ordersList', query: { error: 'invalid-id' } })
          return
        }

        const result = await mockApi.fetchOrder(id)
        order.value = result
      } catch (err: any) {
        console.error('Error loading order:', err)
        order.value = null
      } finally {
        loading.value = false
      }
    })

    return { order, loading }
  }
})
</script>