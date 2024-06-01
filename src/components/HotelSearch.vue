<script setup lang="ts">
import { ref } from 'vue'

const destination = ref<string>('')
const checkInDate = ref<string>('')
const checkOutDate = ref<string>('')
const roomCount = ref<number>(1)
const guestCount = ref<number>(1)

const handleSubmit = () => {
  const searchParams = {
    destination: destination.value,
    checkInDate: checkInDate.value,
    checkOutDate: checkOutDate.value,
    roomCount: roomCount.value,
    guestCount: guestCount.value
  }
  console.log('Searching with params:', searchParams)
}
</script>

<template>
  <div class="mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
    <form
      @submit.prevent="handleSubmit"
      class="space-y-6 flex flex-row flex-wrap items-end justify-between"
    >
      <div class="form-group w-full md:w-auto">
        <label for="destination" class="block text-sm font-medium text-gray-700"
          >Destination:</label
        >
        <input
          type="text"
          id="destination"
          v-model="destination"
          required
          placeholder="Enter destination"
          class="my-2 px-2 h-10 block w-full border-gray-300 shadow-sm outline-none"
        />
      </div>

      <div class="form-group w-full md:w-auto">
        <label for="checkIn" class="block text-sm font-medium text-gray-700">Check-In Date:</label>
        <input
          type="date"
          id="checkIn"
          v-model="checkInDate"
          required
          class="my-2 px-2 h-10 block w-full border-gray-300 shadow-sm outline-none"
        />
      </div>

      <div class="form-group w-full md:w-auto">
        <label for="checkOut" class="block text-sm font-medium text-gray-700"
          >Check-Out Date:</label
        >
        <input
          type="date"
          id="checkOut"
          v-model="checkOutDate"
          required
          class="my-2 px-2 h-10 block w-full border-gray-300 shadow-sm outline-none"
        />
      </div>

      <div class="form-group w-full md:w-auto grid grid-cols-2 gap-4">
        <div>
          <label for="roomCount" class="block text-sm font-medium text-gray-700">Rooms:</label>
          <input
            type="number"
            id="roomCount"
            v-model="roomCount"
            min="1"
            required
            class="my-2 px-2 h-10 block w-full border-gray-300 shadow-sm outline-none"
          />
        </div>

        <div>
          <label for="guestCount" class="block text-sm font-medium text-gray-700">Guests:</label>
          <input
            type="number"
            id="guestCount"
            v-model="guestCount"
            min="1"
            required
            class="my-2 px-2 h-10 block w-full border-gray-300 shadow-sm outline-none"
          />
        </div>
      </div>

      <div class="h-12">
        <button
          type="submit"
          class="px-4 h-10 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
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
