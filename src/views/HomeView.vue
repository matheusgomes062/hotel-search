<script setup lang="ts">
import HotelSearch from '@/components/HotelSearch.vue'
import HotelListFilters from '@/components/HotelListFilters.vue'
import HotelListResult from '@/components/HotelListResult.vue'

import { onMounted, ref } from 'vue'
import type { Hotel } from '@/types'

const hotelsData = ref<Hotel[]>([])
const isLoading = ref(false)
const hasError = ref(false)

const fetchHotels = async () => {
  isLoading.value = true
  hasError.value = false
  try {
    const response = await fetch('/api/hotels.json')
    if (!response.ok) {
      throw new Error('Failed to fetch hotels')
    }
    const data: Hotel[] = await response.json()
    hotelsData.value = data
  } catch (error) {
    console.error('Error fetching hotels:', error)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchHotels()
})
</script>

<template>
  <div>
    <div class="banner bg-indigo-300 rounded-lg py-16 flex flex-col items-center text-center">
      <h1 class="logo-font text-2xl font-bold text-gray-800">Hotel Search Challenge</h1>
      <p class="text-gray-600 mb-4">Search the best hotel for your trip!</p>
    </div>

    <div class="container page">
      <div class="row">
        <div class="gap-2 flex flex-col">
          <div>
            <HotelSearch />
            <HotelListFilters />
          </div>
          <div v-if="isLoading" class="text-center">
            <p>Loading hotels...</p>
          </div>
          <div v-else-if="hasError" class="text-center text-red-500">
            <p>Error loading hotels. Please try again later.</p>
          </div>
          <div v-else>
            <HotelListResult :hotels="hotelsData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
