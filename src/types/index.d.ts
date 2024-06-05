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
  rating: number
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
