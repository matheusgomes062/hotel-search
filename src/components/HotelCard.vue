<template>
  <div class="bg-white rounded shadow-md overflow-hidden">
    <img :src="hotel.imageUrl" alt="" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-medium mb-2">{{ hotel.name }}</h3>
      <p class="text-gray-600 mb-2">{{ hotel.location }}</p>
      <div class="flex items-center gap-2">
        <StarIcon class="w-5 h-5 text-yellow-500" />
        <span class="text-gray-700">{{ hotel.stars }}</span>
      </div>
      <div class="flex flex-col justify-between gap-2 items-start mt-4">
        <span class="text-gray-700 font-semibold">{{ hotel.price }} per night</span>
        <button
          @click="() => addToCompare(hotel)"
          class="self-end px-4 h-8 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
        >
          Compare
        </button>
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

const emit = defineEmits(['addToCompare'])

const addToCompare = (hotel: Hotel) => {
  emit('addToCompare', hotel)
}
</script>

<style scoped></style>
