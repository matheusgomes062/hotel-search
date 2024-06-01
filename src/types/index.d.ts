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
