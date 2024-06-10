import { acceptHMRUpdate, defineStore } from 'pinia'
import type { HotelStore, Hotel, HotelBookingParams, HotelSearchParams } from '@/types'
const VITE_API_URL = import.meta.env.VITE_API_URL

export const useHotelsStore = defineStore({
  id: 'hotels',
  state: (): HotelStore => {
    return {
      hotels: [],
      originalHotels: [],
      isLoading: false,
      hasError: false,
      compareList: [],
      bookedHotels: []
    }
  },
  actions: {
    async fetchHotels(params?: HotelSearchParams) {
      this.isLoading = true
      this.hasError = false
      try {
        const { roomCount, guestCount, checkIn, checkOut, ...restParams } = params || {}
        const queryParams = new URLSearchParams(
          restParams as unknown as Record<string, string>
        ).toString()
        const url = `${VITE_API_URL}/hotels?${queryParams}`
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
      this.compareList = this.compareList.filter((h) => h.id !== hotel.id)
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
    },
    clearBookedHotels() {
      this.bookedHotels = []
    }
  },
  getters: {
    hotelsCount: (state) => state.hotels.length,
    compareCount: (state) => state.compareList.length,
    getBookedHotels: (state) => state.bookedHotels,
    getHasBookingStatus: (state) => state.bookedHotels.length > 0
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHotelsStore, import.meta.hot))
}
