<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import type { Hotel, HotelBookingParams } from '@/types'
import { XIcon, StarIcon } from 'lucide-vue-next'
import { useHotelsStore } from '@/stores/hotels'

const hotelsStore = useHotelsStore()

const props = defineProps<{
  hotel: Hotel
}>()

const emits = defineEmits(['close'])

const name = ref<string>('')
const email = ref<string>('')
const checkInDate = ref<string>('')
const checkOutDate = ref<string>('')
const roomCount = ref<number>(1)
const guestCount = ref<number>(1)

const closeModal = () => {
  emits('close')
}

const submitBooking = () => {
  const bookingParams: HotelBookingParams = {
    name: name.value,
    email: email.value,
    checkInDate: checkInDate.value,
    checkOutDate: checkOutDate.value,
    hotel: props.hotel,
    roomCount: roomCount.value,
    guestCount: guestCount.value
  }

  hotelsStore.bookHotel(bookingParams)
  closeModal()
}

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
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
    <div class="bg-white py-4 px-8 rounded-lg shadow-lg md:max-w-3xl flex flex-col">
      <button
        data-test="close-modal-button"
        @click="closeModal"
        class="text-gray-600 hover:text-gray-800 self-end"
      >
        <XIcon class="w-6 h-6" />
      </button>
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex flex-col">
          <img
            :src="props.hotel.imageUrl"
            alt=""
            class="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 data-test="hotel-name" class="text-2xl font-semibold">{{ hotel.name }}</h2>
          <div class="flex flex-col mb-4">
            <p data-test="hotel-description" class="text-sm max-w-80">
              {{
                hotel.description.length > 300
                  ? hotel.description.slice(0, 300) + '...'
                  : hotel.description
              }}
            </p>
            <a href="#" class="text-blue-500 text-sm">Read more</a>
          </div>
          <div class="flex flex-col items-baseline gap-2 w-full">
            <div class="flex flex-row items-center justify-between w-full">
              <div class="flex gap-2 items-center">
                <StarIcon class="w-4 h-4 md:w-7 md:h-7 text-yellow-500 fill-yellow-500" />
                <span data-test="hotel-stars" class="text-black text-lg"
                  >{{ hotel.stars }} stars</span
                >
              </div>
              <span class="h-4 border border-gray-300"></span>
              <div class="flex items-baseline gap-2">
                <span data-test="hotel-price" class="text-green-700 text-3xl font-semibold"
                  >{{ hotel.price }}$</span
                >
                <span class="text-xs">/per night</span>
              </div>
            </div>

            <div>
              <span data-test="hotel-room-count" class="text-black text-sm"
                >For {{ hotel.roomCount }}</span
              >
              <span class="text-sm"> room(s)</span>
              <span class="text-sm"> and </span>
              <span data-test="hotel-guest-count" class="text-black text-sm">{{
                hotel.guestCount
              }}</span>
              <span class="text-sm"> guests</span>
            </div>
          </div>
        </div>
        <form @submit.prevent="submitBooking">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              data-test="name-input"
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
              data-test="email-input"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="mb-4 gap-4 grid grid-cols-2">
            <div>
              <label for="checkInDate" class="block text-sm font-medium text-gray-700"
                >Check-In Date</label
              >
              <input
                type="date"
                id="checkInDate"
                v-model="checkInDate"
                :min="minCheckInDate"
                data-test="checkIn-input"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label for="checkOutDate" class="block text-sm font-medium text-gray-700"
                >Check-Out Date</label
              >
              <input
                type="date"
                id="checkOutDate"
                v-model="checkOutDate"
                :min="minCheckOutDate"
                data-test="checkOut-input"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div class="mb-4 gap-4 grid grid-cols-2">
            <div>
              <label for="roomCount" class="block text-sm font-medium text-gray-700"
                >Room Count</label
              >
              <input
                type="number"
                id="roomCount"
                v-model="roomCount"
                :min="1"
                :max="props.hotel.roomCount"
                data-test="roomCount-input"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label for="guestCount" class="block text-sm font-medium text-gray-700"
                >Guests Count</label
              >
              <input
                type="number"
                id="guestCount"
                v-model="guestCount"
                :min="1"
                :max="props.hotel.guestCount"
                data-test="guestCount-input"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            data-test="book-room-button"
            class="w-full bg-violet-600 text-white p-2 rounded-md hover:bg-violet-700"
          >
            Book Room
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
