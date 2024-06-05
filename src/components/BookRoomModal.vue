<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ hotel.name }}</h2>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800">&times;</button>
      </div>
      <p class="mb-4">{{ hotel.description }}</p>
      <form @submit.prevent="submitBooking">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="checkInDate" class="block text-sm font-medium text-gray-700"
            >Check-In Date</label
          >
          <input
            type="date"
            id="checkInDate"
            v-model="checkInDate"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="checkOutDate" class="block text-sm font-medium text-gray-700"
            >Check-Out Date</label
          >
          <input
            type="date"
            id="checkOutDate"
            v-model="checkOutDate"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Book Room
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import type { Hotel } from '@/types'

const props = defineProps<{
  hotel: Hotel
}>()

const emits = defineEmits(['close'])

const name = ref('')
const email = ref('')
const checkInDate = ref('')
const checkOutDate = ref('')

const closeModal = () => {
  emits('close')
}

const submitBooking = () => {
  // Handle booking logic here
  console.log('Booking details:', {
    name: name.value,
    email: email.value,
    checkInDate: checkInDate.value,
    checkOutDate: checkOutDate.value,
    hotel: props.hotel
  })

  // After booking, close the modal
  closeModal()
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
