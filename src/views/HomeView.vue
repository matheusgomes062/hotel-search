<script setup lang="ts">
import HotelSearch from '@/components/HotelSearch.vue'
import HotelListFilters from '@/components/HotelListFilters.vue'
import HotelListResult from '@/components/HotelListResult.vue'
import SidebarCompare from '@/components/SidebarCompare.vue'

import { onMounted } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import type { Hotel } from '@/types'

const hotelsStore = useHotelsStore()

onMounted(() => {
  hotelsStore.fetchHotels()
})

const addToCompare = (hotel: Hotel) => {
  hotelsStore.addHotelToCompare(hotel)
}

const removeFromCompare = (hotel: Hotel) => {
  hotelsStore.removeHotelFromCompare(hotel)
}
</script>

<template>
  <div class="flex flex-row">
    <div class="container page py-4">
      <div class="bg-indigo-300 rounded-lg py-16 flex flex-col items-center text-center">
        <h1 class="logo-font text-2xl font-bold text-gray-800">Hotel Search</h1>
        <p class="text-gray-600 mb-4">Search the best hotel for your trip!</p>
      </div>
      <div class="row">
        <div class="gap-2 flex flex-col">
          <div>
            <HotelSearch />
            <HotelListFilters />
          </div>
          <div v-if="hotelsStore.isLoading" class="text-center">
            <p>Loading hotels...</p>
          </div>
          <div v-else-if="hotelsStore.hasError" class="text-center text-red-500">
            <p>Error loading hotels. Please try again later.</p>
          </div>
          <div v-else class="flex flex-row gap-4 w-full justify-end">
            <HotelListResult
              class="w-full"
              :hotels="hotelsStore.hotels"
              @add-to-compare="addToCompare"
              @remove-from-compare="removeFromCompare"
            />
            <SidebarCompare :comparedHotels="hotelsStore.compareList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
