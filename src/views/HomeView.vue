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
  }
])
</script>

<template>
  <div>
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Hotel Search Challenge</h1>
        <p>Search the best hotel for your trip!</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="sidebar">
          <h2>Search hotels</h2>
          <HotelSearch />
          <HotelListFilters />
          <HotelListResult :hotels="hotelsData" />
        </div>
      </div>
    </div>
  </div>
</template>
