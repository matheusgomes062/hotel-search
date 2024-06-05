import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FilterFields, Hotel, HotelSearchParams } from '@/types'

export const useHotelsStore = defineStore({
  id: 'hotels',
  state: () => ({
    hotels: ref<Hotel[]>([]),
    originalHotels: ref<Hotel[]>([]), // Keep a copy of the original list of hotels
    isLoading: ref(false),
    hasError: ref(false),
    compareList: ref<Hotel[]>([]) // State for hotels to compare
  }),
  actions: {
    async fetchHotels(params?: HotelSearchParams) {
      this.isLoading = true
      this.hasError = false
      try {
        const { roomCount, guestCount, checkIn, checkOut, ...restParams } = params || {}

        const queryParams = new URLSearchParams(
          restParams as unknown as Record<string, string>
        ).toString()
        const url = `http://localhost:3000/hotels?${queryParams}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch hotels')
        }
        let data: Hotel[] = await response.json()

        if (roomCount) {
          data = data.filter((hotel) => hotel.roomCount >= roomCount)
        }
        if (guestCount) {
          data = data.filter((hotel) => hotel.guestCount >= guestCount)
        }
        if (checkIn) {
          const checkInDate = new Date(checkIn)
          console.log('CheckIn date:', checkInDate)
          data = data.filter((hotel) => new Date(hotel.availableFrom) <= checkInDate)
          console.log('Hotels after filtering by checkIn:', data)
        }
        if (checkOut) {
          const checkOutDate = new Date(checkOut)
          console.log('CheckOut date:', checkOutDate)
          data = data.filter((hotel) => new Date(hotel.availableTo) >= checkOutDate)
          console.log('Hotels after filtering by checkOut:', data)
        }

        this.hotels = data
        this.originalHotels = data // Save a copy of the original data
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
    },
    filterHotels(orderValue: string, filters: Record<string, number>) {
      let hotels = this.originalHotels.slice() // Use the originalHotels for filtering

      switch (orderValue) {
        case 'price':
          hotels.sort((a, b) => a.price - b.price)
          break
        case 'stars':
          hotels.sort((a, b) => b.stars - a.stars)
          break
        case 'name':
          hotels.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          break
      }

      for (const [field, value] of Object.entries(filters)) {
        if (field === 'minStars') {
          hotels = hotels.filter((hotel) => hotel.stars >= value)
        }
        if (field === 'maxPrice') {
          hotels = hotels.filter((hotel) => hotel.price <= value)
        }
        if (field === 'minPrice') {
          hotels = hotels.filter((hotel) => hotel.price >= value)
        }
      }

      this.hotels = hotels
    }
  },
  getters: {
    hotelsCount: (state) => state.hotels.length,
    compareCount: (state) => state.compareList.length
  }
})
