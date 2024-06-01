<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <template v-for="hotel in hotels" :key="hotel.id">
      <div class="bg-white rounded shadow-md overflow-hidden">
        <img :src="hotel.imageUrl" alt="" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-medium mb-2">{{ hotel.name }}</h3>
          <p class="text-gray-600 mb-2">{{ hotel.location }}</p>
          <div class="flex items-center gap-2">
            <StarIcon class="w-5 h-5 text-yellow-500" />
            <span class="text-gray-700">{{ hotel.stars }}</span>
          </div>
          <div class="flex justify-between items-center mt-4">
            <span class="text-gray-700 font-semibold">{{ hotel.price }} per night</span>
            <button class="btn btn-primary px-3 py-2">Compare</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from '@/types'
import { StarIcon } from 'lucide-vue-next'

// Rest of the code...

const props = defineProps<{
  hotels: Hotel[]
}>()

const emit = defineEmits(['compareHotel'])

const compareHotel = (hotel: Hotel) => {
  emit('compareHotel', hotel)
}
</script>

<style scoped>
.btn {
  /* Add your button styles here */
}
</style>
