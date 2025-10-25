<template>
  <div class="auth">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label>Username</label>
        <input v-model="username" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useAuth from '@/composables/useAuth'

export default defineComponent({
  setup() {
    const username = ref('')
    const password = ref('')
    const error = ref<string | null>(null)
    const { login } = useAuth()

    async function onSubmit() {
      error.value = null
      try {
        await login(username.value, password.value)
      } catch (e: any) {
        error.value = e.message || 'Помилка'
      }
    }

    return { username, password, onSubmit, error }
  }
})
</script>