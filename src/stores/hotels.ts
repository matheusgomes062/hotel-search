import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Hotel, HotelSearchParams } from '@/types'

export const useHotelsStore = defineStore({
  id: 'hotels',
  state: () => ({
    hotels: ref<Hotel[]>([]),
    isLoading: ref(false),
    hasError: ref(false),
    compareList: ref<Hotel[]>([]) // State for hotels to compare
  }),
  actions: {
    async fetchHotels(params: HotelSearchParams) {
      this.isLoading = true
      this.hasError = false
      try {
        const { roomCount, guestCount, ...restParams } = params || {}

        const queryParams = new URLSearchParams(
          restParams as unknown as Record<string, string>
        ).toString()
        const url = `http://localhost:3000/hotels?${queryParams}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch hotels')
        }
        let data: Hotel[] = await response.json()

        // Filter hotels based on minimum rooms and guest count
        if (roomCount) {
          data = data.filter((hotel) => hotel.roomCount >= roomCount)
        }
        if (guestCount) {
          data = data.filter((hotel) => hotel.guestCount >= guestCount)
        }
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
