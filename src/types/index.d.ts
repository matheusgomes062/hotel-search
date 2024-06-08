// HotelListFilters

export interface OrderOption {
  value: string
  text: string
}

export interface FilterFields {
  name: string
  label: string
  type: 'number'
  min?: number
  max?: number
}

export interface Hotel {
  id: number
  name: string
  price: number
  city: string
  imageUrl: string
  location: string
  stars: number
  availableFrom: string
  availableTo: string
  roomCount: number
  guestCount: number
  description: string
}

export interface HotelSearchParams {
  city: string | null
  checkIn: string | null
  checkOut: string | null
  roomCount: number
  guestCount: number
}

export interface HotelBookingParams {
  name: string
  email: string
  checkInDate: string
  checkOutDate: string
  hotel: Hotel
  roomCount: number
  guestCount: number
}

export interface Notification {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}

export interface HotelStore {
  hotels: Hotel[]
  originalHotels: Hotel[]
  compareList: Hotel[]
  bookedHotels: HotelBookingParams[]
  isLoading: boolean
  hasError: boolean
}
