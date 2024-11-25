import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type User } from '@/stores/auth'

export function useLogin() {
  const router = useRouter()
  const authStore = useAuthStore()

  const email = ref('')
  const password = ref('')
  const error = ref('')
  const isLoading = ref(false)
  const availableUsers = ref<User[]>([])

  async function fetchUsers() {
    isLoading.value = true
    try {
      availableUsers.value = await authStore.fetchUsers()
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function handleLogin() {
    error.value = ''
    isLoading.value = true

    try {
      if (!email.value || !password.value) {
        error.value = 'Please fill in all fields'
        return
      }

      await authStore.login({
        email: email.value,
        password: password.value
      })

      router.push('/')
    } catch (err: unknown) {
      error.value = (err as Error).message || 'Invalid credentials'
    } finally {
      isLoading.value = false
    }
  }

  return {
    email,
    password,
    error,
    isLoading,
    availableUsers,
    fetchUsers,
    handleLogin
  }
}
