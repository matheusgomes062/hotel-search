import { defineStore } from 'pinia'
import type { Hotel, HotelBookingParams, HotelSearchParams } from '@/types'

export const useHotelsStore = defineStore({
  id: 'hotels',
  state: () => ({
    hotels: [] as Hotel[],
    originalHotels: [] as Hotel[],
    isLoading: false,
    hasError: false,
    compareList: [] as Hotel[],
    bookedHotels: [] as HotelBookingParams[]
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

        if (!response.ok) throw new Error('Failed to fetch hotels')

        let data: Hotel[] = await response.json()

        if (roomCount) data = data.filter((hotel) => hotel.roomCount >= roomCount)
        if (guestCount) data = data.filter((hotel) => hotel.guestCount >= guestCount)
        if (checkIn) {
          const checkInDate = new Date(checkIn)
          data = data.filter((hotel) => new Date(hotel.availableFrom) <= checkInDate)
        }
        if (checkOut) {
          const checkOutDate = new Date(checkOut)
          data = data.filter((hotel) => new Date(hotel.availableTo) >= checkOutDate)
        }

        this.hotels = data
        this.originalHotels = data
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
    clearComparedHotels() {
      this.compareList = []
    },
    filterHotels(orderValue: string, filters: Record<string, number>) {
      const validOrderValues = ['price', 'stars', 'name']
      let hotels = [...this.originalHotels]

      if (validOrderValues.includes(orderValue)) {
        hotels = hotels.sort((a, b) => {
          if (orderValue === 'name') return a.name.localeCompare(b.name)
          return orderValue === 'price' ? a.price - b.price : b.stars - a.stars
        })
      }

      Object.entries(filters).forEach(([field, value]) => {
        if (field === 'minStars') hotels = hotels.filter((hotel) => hotel.stars >= value)
        if (field === 'maxPrice') hotels = hotels.filter((hotel) => hotel.price <= value)
        if (field === 'minPrice') hotels = hotels.filter((hotel) => hotel.price >= value)
      })

      this.hotels = hotels
    },
    bookHotel(bookingParams: HotelBookingParams) {
      this.bookedHotels.push(bookingParams)
    }
  },
  getters: {
    hotelsCount: (state) => state.hotels.length,
    compareCount: (state) => state.compareList.length
  }
})
