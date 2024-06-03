<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <HotelCard
      v-for="hotel in props.hotels"
      :key="hotel.id"
      :hotel="hotel"
      @addToCompare="addToCompare"
    />
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from '@/types'
import HotelCard from '@/components/HotelCard.vue'
import { useHotelsStore } from '@/stores/hotels'

const hotelsStore = useHotelsStore()

const addToCompare = (hotel: Hotel) => {
  hotelsStore.addHotelToCompare(hotel)
}

const props = defineProps<{
  hotels: Hotel[]
}>()
</script>

<style scoped></style>
