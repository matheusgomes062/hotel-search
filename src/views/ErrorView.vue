<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
    <h1 class="text-5xl font-bold text-red-600">Oops!</h1>
    <p class="mt-4 text-xl text-gray-700">Something went wrong.</p>
    <p class="mt-2 text-gray-500">We're working on getting this fixed as soon as we can.</p>
    <button @click="goBack" class="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Go Back
    </button>
  </div>
</template>
