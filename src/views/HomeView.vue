<script setup lang="ts">
import HotelSearch from '@/components/HotelSearch.vue'
import HotelListFilters from '@/components/HotelListFilters.vue'
import HotelListResult from '@/components/HotelListResult.vue'

import { ref } from 'vue'
import type { Hotel } from '@/types'

const hotelsData = ref<Hotel[]>([
  {
    id: 1,
    name: 'Hotel A',
    location: 'Location A',
    imageUrl: 'https://via.placeholder.com/300',
    stars: 4,
    price: 100,
    city: 'City A',
    rating: 4.5,
    availability: true
  },
  {
    id: 2,
    name: 'Hotel B',
    location: 'Location B',
    imageUrl: 'https://via.placeholder.com/300',
    stars: 3,
    price: 80,
    city: 'City B',
    rating: 4.0,
    availability: false
  },
  {
    id: 3,
    name: 'Hotel C',
    location: 'Location C',
    imageUrl: 'https://via.placeholder.com/300',
    stars: 5,
    price: 120,
    city: 'City C',
    rating: 3.5,
    availability: true
  },
  {
    id: 4,
    name: 'Hotel D',
    location: 'Location D',
    imageUrl: 'https://via.placeholder.com/300',
    stars: 4,
    price: 90,
    city: 'City D',
    rating: 4.0,
    availability: true
  }
])
</script>

<template>
  <div>
    <div class="banner bg-indigo-300 rounded-lg py-16 flex flex-col items-center text-center">
      <h1 class="logo-font text-2xl font-bold text-gray-800">Hotel Search Challenge</h1>
      <p class="text-gray-600 mb-4">Search the best hotel for your trip!</p>
    </div>

    <div class="container page">
      <div class="row">
        <div class="gap-2 flex flex-col">
          <div>
            <HotelSearch />
            <HotelListFilters />
          </div>
          <HotelListResult :hotels="hotelsData" />
        </div>
      </div>
    </div>
  </div>
</template>
