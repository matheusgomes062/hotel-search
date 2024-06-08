<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import type { HotelSearchParams } from '@/types'

const hotelsStore = useHotelsStore()

const destination = ref<string>('')
const checkInDate = ref<string>('')
const checkOutDate = ref<string>('')
const roomCount = ref<number>(1)
const guestCount = ref<number>(1)

const today = new Date().toISOString().split('T')[0]

const minCheckInDate = computed(() => today)

const minCheckOutDate = computed(() => {
  return checkInDate.value
    ? new Date(new Date(checkInDate.value).getTime() + 86400000).toISOString().split('T')[0]
    : today
})

watch(checkInDate, (newCheckInDate) => {
  if (checkOutDate.value && new Date(checkOutDate.value) <= new Date(newCheckInDate)) {
    checkOutDate.value = new Date(new Date(newCheckInDate).getTime() + 86400000)
      .toISOString()
      .split('T')[0]
  }
})

const handleSubmit = async () => {
  const searchParams: HotelSearchParams = {
    city: destination.value,
    checkIn: checkInDate.value,
    checkOut: checkOutDate.value,
    roomCount: roomCount.value,
    guestCount: guestCount.value
  }

  await hotelsStore.fetchHotels(searchParams)
}
</script>

<template>
  <div class="">
    <form @submit.prevent="handleSubmit" class="flex flex-col flex-wrap gap-4">
      <div class="form-group w-full rounded-full bg-white items-center px-10 py-5 border">
        <label for="destination" class="block text-sm font-medium text-gray-700"
          >Destination:</label
        >
        <input
          type="text"
          id="destination"
          data-test="destination-input"
          v-model="destination"
          placeholder="Enter destination"
          class="text-sm h-8 w-full border-gray-300 outline-none"
        />
      </div>

      <div
        class="form-group w-full flex flex-row rounded-full bg-white items-center px-10 py-5 border justify-between"
      >
        <div class="w-auto border-r pr-8 border-gray-300">
          <label for="checkIn" class="block text-sm font-medium text-gray-700"
            >Check-In Date:</label
          >
          <input
            type="date"
            id="checkIn"
            data-test="checkIn-input"
            v-model="checkInDate"
            :min="minCheckInDate"
            class="text-sm h-8 w-full border-gray-300 outline-none"
          />
        </div>

        <div class="w-auto border-r pr-8 border-gray-300">
          <label for="checkOut" class="block text-sm font-medium text-gray-700"
            >Check-Out Date:</label
          >
          <input
            type="date"
            id="checkOut"
            data-test="checkOut-input"
            v-model="checkOutDate"
            :min="minCheckOutDate"
            class="text-sm h-8 w-full border-gray-300 outline-none"
          />
        </div>

        <div class="w-auto grid grid-cols-2 gap-4">
          <div class="border-r pr-8 border-gray-300">
            <label for="roomCount" class="block text-sm font-medium text-gray-700">Rooms:</label>
            <input
              type="number"
              id="roomCount"
              data-test="roomCount-input"
              v-model="roomCount"
              min="1"
              class="text-sm h-8 w-1/2 outline-none"
            />
          </div>

          <div class="border-r pr-8 border-gray-300">
            <label for="guestCount" class="block text-sm font-medium text-gray-700">Guests:</label>
            <input
              type="number"
              id="guestCount"
              data-test="guestCount-input"
              v-model="guestCount"
              min="1"
              class="text-sm h-8 w-1/2 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          data-test="search-button"
          class="px-4 h-10 text-white font-semibold rounded-full shadow bg-violet-600 hover:bg-violet-700"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Add any additional custom styles if needed */
</style>
