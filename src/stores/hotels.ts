import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Hotel } from '@/types'

export const useHotelsStore = defineStore({
  id: 'hotels',
  state: () => ({
    hotels: ref<Hotel[]>([]),
    isLoading: ref(false),
    hasError: ref(false),
    compareList: ref<Hotel[]>([]) // State for hotels to compare
  }),
  actions: {
    async fetchHotels() {
      this.isLoading = true
      this.hasError = false
      try {
        const response = await fetch('api/hotels.json')
        if (!response.ok) {
          throw new Error('Failed to fetch hotels')
        }
        const data: Hotel[] = await response.json()
        this.hotels = data
      } catch (error) {
        console.error('Error fetching hotels:', error)
        this.hasError = true
      } finally {
        this.isLoading = false
      }
    },
    addHotelToCompare(hotel: Hotel) {
      if (!this.compareList.includes(hotel)) {
        this.compareList.push(hotel)
      }
    },
    removeHotelFromCompare(hotel: Hotel) {
      this.compareList = this.compareList.filter((h) => h !== hotel)
    }
  },
  getters: {
    hotelsCount: (state) => state.hotels.length,
    compareCount: (state) => state.compareList.length
  }
})
