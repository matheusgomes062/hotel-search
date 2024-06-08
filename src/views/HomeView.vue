<script setup lang="ts">
import HotelSearch from '@/components/HotelSearch.vue'
import HotelListFilters from '@/components/HotelListFilters.vue'
import HotelListResult from '@/components/HotelListResult.vue'
import CompareHotels from '@/components/CompareHotels.vue'

import { onMounted } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import type { Hotel } from '@/types'

const hotelsStore = useHotelsStore()
const bookingStatus = hotelsStore.getBookedHotels

onMounted(() => {
  hotelsStore.fetchHotels()
})

const removeFromCompare = (hotel: Hotel) => {
  hotelsStore.removeHotelFromCompare(hotel)
}
</script>

<template>
  <div class="flex flex-row">
    <div class="container page py-4">
      <div class="bg-violet-300 rounded-xl py-6 flex flex-col items-center text-center">
        <img
          aria-label="Hotel-Logo"
          src="https://img.logoipsum.com/286.svg"
          alt="Hotel-Logo"
          class="w-60"
        />
      </div>
      <h1
        class="text-black self-center justify-center flex mt-12 mb-8 text-3xl md:text-6xl font-medium"
      >
        Find the right hotel for &nbsp;<i class="text-violet-700">you!</i>
      </h1>
      <div>
        <div class="gap-2 flex flex-col">
          <div class="flex flex-col items-center justify-center mb-4">
            <HotelSearch />
            <HotelListFilters />
          </div>
          <CompareHotels :comparedHotels="hotelsStore.compareList" />
          <div v-if="hotelsStore.isLoading" class="text-center">
            <p>Loading hotels...</p>
          </div>
          <div v-else-if="hotelsStore.hasError" class="text-center text-red-500">
            <p>Error loading hotels. Please try again later.</p>
          </div>
          <div v-else class="flex flex-row gap-4 w-full justify-end mt-4">
            <HotelListResult
              class="w-full"
              :hotels="hotelsStore.hotels"
              @remove-from-compare="removeFromCompare"
            />
          </div>
        </div>
      </div>
      <div
        class="fixed bottom-5 right-5 flex flex-row w-fit gap-4 p-4 bg-background outline outline-violet-500 shadow-md rounded-md"
        v-if="bookingStatus.length > 0"
      >
        <p>Check your booking status here!</p>
        <router-link to="/booking-status" class="text-blue-500 font-bold hover:underline"
          >Booking Status</router-link
        >
      </div>
    </div>
  </div>
</template>
