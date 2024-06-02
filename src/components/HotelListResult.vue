<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <HotelCard
      v-for="hotel in hotels"
      :key="hotel.id"
      :hotel="hotel"
      @compareHotel="compareHotel"
    />
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from '@/types'
import HotelCard from '@/components/HotelCard.vue'

// Rest of the code...

const props = defineProps<{
  hotels: Hotel[]
}>()

const emit = defineEmits(['compareHotel'])

const compareHotel = (hotel: Hotel) => {
  emit('compareHotel', hotel)
}
</script>

<style scoped></style>
