<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
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
</script>

<template>
  <aside
    class="fixed inset-y-0 right-0 z-10 flex-col p-4 border-l bg-background transition-all duration-300 sm:flex"
  >
    <button
      @click="toggleSidebar"
      class="flex h-9 w-9 items-center justify-center self-start rounded-lg bg-indigo-600"
    >
      <ChevronRight class="w-6 h-6 text-white" v-if="showSidebar" />
      <ChevronLeft class="w-6 h-6 text-white" v-else />
    </button>
    <nav class="flex flex-col items-start gap-4 px-4 py-5" v-if="showSidebar">
      <h2 class="text-xl font-bold mb-4">Compare Hotels</h2>
      <div
        v-for="hotel in props.comparedHotels"
        :key="hotel.id"
        class="mb-4 border rounded-md p-4 w-full"
      >
        <div class="flex flex-col justify-between items-start">
          <h3 class="text-lg font-medium">{{ hotel.name }}</h3>
          <button
            @click="() => removeHotelFromComparison(hotel)"
            class="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
        <!-- <ul class="list-disc pl-4">
          <li v-for="feature in hotel.features" :key="feature">{{ feature }}</li>
        </ul> -->
      </div>
      <div class="text-center" v-if="props.comparedHotels.length === 0">
        No hotels selected for comparison.
      </div>
    </nav>
  </aside>
</template>

<style scoped></style>
