<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import type { Hotel } from '@/types'

const hotelStore = useHotelsStore()
const loading = ref(false)
const bookedHotels = hotelStore.getBookedHotels
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-xl font-bold mb-4">Booking Status</h1>
      <div v-if="loading" class="flex justify-center items-center">
        <svg
          class="animate-spin h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
          ></path>
        </svg>
        <span class="ml-2 text-gray-500">Loading...</span>
      </div>
      <div v-else-if="bookedHotels">
        <h2 class="text-lg font-semibold mb-2">{{ bookedHotels[0].hotel.name }}</h2>
        <p class="text-gray-700 mb-4">{{ bookedHotels[0].hotel.location }}</p>
        <p class="text-gray-500">
          Your booking is currently
          <span class="font-semibold text-yellow-500">waiting for approval</span>.
        </p>
      </div>
      <div v-else>
        <p class="text-gray-500">No bookings found.</p>
      </div>
    </div>
  </div>
</template>
