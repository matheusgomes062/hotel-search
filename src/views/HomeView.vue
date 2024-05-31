<script setup lang="ts">
import HotelSearch from '@/components/HotelSearch.vue'
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
          <p>Search hotels</p>
          <HotelSearch />
        </div>
      </div>
    </div>
  </div>
</template>
