// HotelListFilters

export interface OrderOption {
  value: string
  text: string
}

export interface FilterField {
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
  availability: boolean
}
