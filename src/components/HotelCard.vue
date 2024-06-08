<script setup lang="ts">
import type { Hotel } from '@/types'
import { StarIcon } from 'lucide-vue-next'

const props = defineProps<{
  hotel: Hotel
}>()

const emit = defineEmits(['addToCompare', 'bookRoom'])

const addToCompare = (hotel: Hotel) => {
  emit('addToCompare', hotel)
}

const bookRoom = (hotel: Hotel) => {
  emit('bookRoom', hotel)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:scale-[101%]">
    <img :src="props.hotel.imageUrl" alt="" class="w-full h-48 object-cover" />
    <div class="p-4 justify-between gap-4 grid grid-cols-2">
      <div class="">
        <h2 data-test="hotel-name" class="text-2xl font-medium">{{ props.hotel.name }}</h2>
        <p data-test="hotel-city" class="text-gray-600 mb-2 text-sm">
          {{ props.hotel.city }}
        </p>
        <div class="flex items-center gap-2 border-2 border-yellow-500 w-fit rounded-full px-2">
          <StarIcon class="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
          <span data-test="hotel-stars" class="text-black">{{ props.hotel.stars }}</span>
        </div>
        <div class="flex flex-col justify-between gap-2 items-start mt-2 md:mt-4">
          <div class="text-wrapper">
            <span data-test="hotel-price-per-night" class="text-green-700 text-4xl font-semibold"
              >{{ props.hotel.price }}$</span
            ><span class="text-xs">/per night</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <button
          data-test="compare-hotel-button"
          @click="() => addToCompare(hotel)"
          class="w-full px-4 py-1 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700"
        >
          Compare
        </button>
        <button
          data-test="book-room-hotel-button"
          @click="() => bookRoom(hotel)"
          class="w-full h-full px-4 bg-violet-600 text-white font-semibold rounded-lg shadow hover:bg-violet-700"
        >
          Book a room
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
