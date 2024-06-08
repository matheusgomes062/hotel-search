<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import { ChevronUp, ChevronDown, SquareX } from 'lucide-vue-next'
import type { Hotel } from '@/types'

const props = defineProps({
  comparedHotels: {
    type: Array as () => Hotel[],
    required: true
  }
})

const showSidebar = ref(true)

const hotelsStore = useHotelsStore()

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
const removeHotelFromComparison = (hotel: Hotel) => {
  hotelsStore.removeHotelFromCompare(hotel)
}

const clearAll = () => {
  hotelsStore.clearComparedHotels()
}
</script>

<template>
  <div
    :class="[
      'inset-y-0 left-0 h-fit flex-col p-4 bg-background transition-all duration-300 shadow-md rounded-md sm:flex',
      { 'h-full': showSidebar }
    ]"
  >
    <div class="flex flex-row justify-between">
      <div class="flex flex-row gap-4">
        <button
          data-test="toggle-sidebar"
          aria-label="Toggle Sidebar"
          @click="toggleSidebar"
          class="flex h-9 w-9 items-center justify-center self-start rounded-lg bg-violet-600"
        >
          <ChevronUp class="w-6 h-6 text-white" v-if="showSidebar" />
          <ChevronDown class="w-6 h-6 text-white" v-else />
        </button>
        <span class="whitespace-nowrap self-center">Compare Hotels</span>
      </div>
      <button
        data-test="clear-all"
        @click="clearAll"
        v-if="props.comparedHotels.length > 0 && showSidebar"
        class="text-white font-bold hover:underline ml-2 bg-red-500 px-4 rounded-lg shadow-md hover:bg-red-600"
      >
        Clear All
      </button>
    </div>
    <div class="flex flex-col items-start gap-4 py-5" v-if="showSidebar">
      <div class="text-center" v-if="props.comparedHotels.length === 0">
        No hotels selected for comparison.
      </div>
      <div class="overflow-auto w-full" v-else>
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border-r border-b border-gray-200">Property</th>
              <th v-for="hotel in props.comparedHotels" :key="hotel.id" class="border-r">
                <div class="relative flex items-center justify-center">
                  <div
                    class="relative flex flex-col items-center justify-center w-full h-12 overflow-hidden"
                  >
                    <img
                      :src="hotel.imageUrl"
                      class="absolute inset-0 w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black opacity-40"></div>
                    <span class="relative z-10 text-white drop-shadow-lg">{{ hotel.name }}</span>
                    <button
                      data-test="remove-hotel"
                      @click="() => removeHotelFromComparison(hotel)"
                      class="absolute top-1 right-1 text-white hover:text-red-700 z-10"
                    >
                      <SquareX class="w-5 h-5 fill-red-500" />
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-r border-b p-2">Stars</td>
              <td
                v-for="hotel in props.comparedHotels"
                :key="hotel.id"
                class="border p-2 text-center"
              >
                {{ hotel.stars }}
              </td>
            </tr>
            <tr>
              <td class="border-r border-b p-2">Price</td>
              <td
                v-for="hotel in props.comparedHotels"
                :key="hotel.id"
                class="border p-2 text-center"
              >
                {{ hotel.price }}
              </td>
            </tr>
            <tr>
              <td class="border-r border-b p-2">Rooms</td>
              <td
                v-for="hotel in props.comparedHotels"
                :key="hotel.id"
                class="border p-2 text-center"
              >
                {{ hotel.roomCount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
