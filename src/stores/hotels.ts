// store/hotels.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Hotel } from '@/types'

export const useHotelsStore = defineStore({
  id: 'hotels',
  state: () => ({
    hotels: ref<Hotel[]>([]),
    isLoading: ref(false),
    hasError: ref(false)
  }),
  actions: {
    async fetchHotels() {
      this.isLoading = true
      this.hasError = false
      try {
        const response = await fetch('https://api.example.com/hotels')
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
    }
  },
  getters: {
    hotelsCount: (state) => state.hotels.length
  }
})
