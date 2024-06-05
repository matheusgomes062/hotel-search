<template>
  <div class="bg-white rounded shadow-md overflow-hidden">
    <img :src="props.hotel.imageUrl" alt="" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-medium mb-2">{{ props.hotel.name }}</h3>
      <p class="text-gray-600 mb-2">{{ props.hotel.location }}</p>
      <div class="flex items-center gap-2">
        <StarIcon class="w-5 h-5 text-yellow-500" />
        <span class="text-gray-700">{{ props.hotel.stars }}</span>
      </div>
      <div class="flex flex-col justify-between gap-2 items-start mt-4">
        <span class="text-gray-700 font-semibold">{{ props.hotel.price }}$ per night</span>
        <div class="flex flex-row gap-4 justify-end w-full mt-4">
          <button
            @click="() => addToCompare(hotel)"
            class="self-end px-4 h-8 bg-purple-600 text-white font-semibold rounded-md shadow hover:bg-purple-700"
          >
            Compare
          </button>
          <button
            @click="() => bookRoom(hotel)"
            class="self-end px-4 h-8 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
          >
            Book a room
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

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

<style scoped></style>
