<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import { LoaderCircle } from 'lucide-vue-next'
import HotelComposableCard from '@/components/HotelComposableCard.vue'

const hotelStore = useHotelsStore()
const loading = ref(false)
const bookedHotels = hotelStore.getBookedHotels

const bookingStatus = ref('Initiated') // You can dynamically update this based on actual status

const statusSteps = computed(() => {
  return [
    {
      label: 'Initiated',
      value: 'Initiated',
      active: bookingStatus.value === 'Initiated'
    },
    {
      label: 'Preparing Approval',
      value: 'preparing',
      active: bookingStatus.value === 'preparing'
    },
    { label: 'Approved', value: 'approved', active: bookingStatus.value === 'approved' },
    { label: 'Booked', value: 'booked', active: bookingStatus.value === 'booked' },
    { label: 'Declined', value: 'declined', active: bookingStatus.value === 'declined' }
  ]
})
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-fit">
      <h1 class="text-xl font-bold mb-4">Booking Status</h1>
      <div v-if="loading" class="flex justify-center items-center">
        <LoaderCircle class="animate-spin h-5 w-5 text-gray-500" />
        <span class="ml-2 text-gray-500">Loading...</span>
      </div>
      <div v-if="bookedHotels" class="flex flex-row gap-4">
        <HotelComposableCard :hotel="bookedHotels[0]?.hotel" />
        <div class="flex flex-col">
          <div class="timeline">
            <div v-for="step in statusSteps" :key="step.value" class="timeline-item">
              <div :class="['circle', step.active ? 'active animate-pulse' : '']"></div>
              <div :class="['label', step.active ? 'active' : '']">{{ step.label }}</div>
            </div>
          </div>
          <p class="text-gray-500 mt-4">
            Your booking is currently
            <span class="font-semibold text-yellow-500">{{ bookingStatus }}</span
            >.
          </p>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-500">No bookings found.</p>
      </div>
    </div>
  </div>
</template>
