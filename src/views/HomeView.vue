<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import MainLayout from '@/components/MainLayout.vue'
import { useUserStory } from '@/composables/useUserStory'

const authStore = useAuthStore()
const { getUserStory } = useUserStory()
</script>

<template>
  <MainLayout>
    <div class="px-4 py-5">
      <h3 class="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-500">Full name</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-500">Email address</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ authStore.user?.email }}
          </dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-500">Avatar</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <img 
              :src="authStore.user?.avatar" 
              :alt="authStore.user?.first_name"
              class="h-20 w-20 rounded-full"
            >
          </dd>
        </div>
      </dl>
    </div>

    <div class="border-t border-gray-200 px-4 py-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Story</h3>
      </div>
      <div class="pt-5 space-y-6">
        <div class="flex items-start space-x-6">
          <div>
            <p class="text-gray-700 leading-relaxed">
              {{ getUserStory() }}
            </p>
          </div>
        </div>
        
        <div class="mt-8">
          <h4 class="text-sm font-medium text-gray-500 mb-4">Skills & Interests</h4>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              Technology
            </span>
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Innovation
            </span>
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Leadership
            </span>
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Mentoring
            </span>
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Collaboration
            </span>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
