import { useAuthStore } from '@/stores/auth'

export function useUserStory() {
  const authStore = useAuthStore()

  function getUserStory() {
    const user = authStore.user
    if (!user) return ''

    return `${user.first_name} ${user.last_name} is a remarkable individual who has made significant 
    contributions to our community. After joining our platform, ${user.first_name} has shown exceptional 
    skills in collaboration and innovation. Their unique perspective and dedication have inspired many 
    of their colleagues. When not working on groundbreaking projects, ${user.first_name} enjoys exploring 
    new technologies and mentoring others in the field. Their journey from ${user.first_name.toLowerCase()}.tech.blog 
    to their current role has been nothing short of extraordinary.`
  }

  return {
    getUserStory
  }
} 