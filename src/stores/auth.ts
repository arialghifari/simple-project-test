import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  error?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const users = ref<User[]>([])
  const isAuthenticated = computed(() => !!token.value)

  // Fetch available users on store initialization
  async function fetchUsers() {
    try {
      const response = await fetch('https://reqres.in/api/users?per_page=3')
      const data = await response.json()
      users.value = data.data
      return data.data
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  }

  async function login(credentials: LoginCredentials) {
    try {
      // First check if the email exists in users list
      const userExists = users.value.find(u => u.email === credentials.email)
      if (!userExists) {
        throw new Error('User not found. Please use one of the available user.')
      }

      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      })

      const data: LoginResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      token.value = data.token
      user.value = userExists

      return true
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return {
    user,
    users,
    token,
    isAuthenticated,
    login,
    logout,
    fetchUsers
  }
})
