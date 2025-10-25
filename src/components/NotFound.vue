<template>
  <div>
    <h1>404 — Not Found</h1>
    <div>
      <router-link v-if="isAuth" to="/orders">Go to orders</router-link>
      <router-link v-else to="/auth">Go to login</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/authStore'

export default defineComponent({
  setup() {
    const auth = useAuthStore()
    const isAuth = auth.isAuthenticated()
    return { isAuth }
  }
})
</script>