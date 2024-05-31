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
  <div class="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="form-group">
        <label for="destination" class="block text-sm font-medium text-gray-700"
          >Destination:</label
        >
        <input
          type="text"
          id="destination"
          v-model="destination"
          required
          placeholder="Enter destination"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-primary focus:ring-opacity-50 outline-none border-none"
        />
      </div>

      <div class="form-group">
        <label for="checkIn" class="block text-sm font-medium text-gray-700">Check-In Date:</label>
        <input
          type="date"
          id="checkIn"
          v-model="checkInDate"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div class="form-group">
        <label for="checkOut" class="block text-sm font-medium text-gray-700"
          >Check-Out Date:</label
        >
        <input
          type="date"
          id="checkOut"
          v-model="checkOutDate"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div class="form-group grid grid-cols-2 gap-4">
        <div>
          <label for="roomCount" class="block text-sm font-medium text-gray-700">Rooms:</label>
          <input
            type="number"
            id="roomCount"
            v-model="roomCount"
            min="1"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Search
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Add any additional custom styles if needed */
</style>
