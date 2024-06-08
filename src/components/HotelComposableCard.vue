<script setup lang="ts">
import { defineProps } from 'vue'
import type { Hotel } from '@/types'
import { StarIcon } from 'lucide-vue-next'

const props = defineProps<{
  hotel: Hotel
}>()
</script>

<template>
  <div class="flex flex-col">
    <img :src="props.hotel.imageUrl" alt="" class="w-full h-48 object-cover rounded-md mb-4" />
    <h2 data-test="hotel-name" class="text-2xl font-semibold">{{ props.hotel.name }}</h2>
    <div class="flex flex-col mb-4">
      <p data-test="hotel-description" class="text-sm max-w-80">
        {{
          props.hotel.description.length > 300
            ? props.hotel.description.slice(0, 300) + '...'
            : props.hotel.description
        }}
      </p>
      <a href="#" class="text-blue-500 text-sm">Read more</a>
    </div>
    <div class="flex flex-col items-baseline gap-2 w-full">
      <div class="flex flex-row items-center justify-between w-full">
        <div class="flex gap-2 items-center">
          <StarIcon class="w-4 h-4 md:w-7 md:h-7 text-yellow-500 fill-yellow-500" />
          <span data-test="hotel-stars" class="text-black text-lg"
            >{{ props.hotel.stars }} stars</span
          >
        </div>
        <span class="h-4 border border-gray-300"></span>
        <div class="flex items-baseline gap-2">
          <span data-test="hotel-price" class="text-green-700 text-3xl font-semibold"
            >{{ props.hotel.price }}$</span
          >
          <span class="text-xs">/per night</span>
        </div>
      </div>

      <div>
        <span data-test="hotel-room-count" class="text-black text-sm"
          >For {{ props.hotel.roomCount }}</span
        >
        <span class="text-sm"> room(s)</span>
        <span class="text-sm"> and </span>
        <span data-test="hotel-guest-count" class="text-black text-sm">{{
          props.hotel.guestCount
        }}</span>
        <span class="text-sm"> guests</span>
      </div>
    </div>
  </div>
</template>
