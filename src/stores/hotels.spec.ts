import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useHotelsStore } from '@/stores/hotels'
import type { Hotel, HotelBookingParams, HotelSearchParams } from '@/types'

const getHotels = (): Hotel[] => [
  {
    id: 1,
    name: 'Hotel One',
    roomCount: 10,
    guestCount: 20,
    availableFrom: '2023-06-01',
    availableTo: '2023-06-10',
    price: 100,
    stars: 4,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Hotel description A',
    location: 'Hotel location A',
    city: 'Hotel city A'
  },
  {
    id: 2,
    name: 'Hotel Two',
    roomCount: 5,
    guestCount: 10,
    availableFrom: '2023-06-01',
    availableTo: '2023-06-10',
    price: 150,
    stars: 5,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Hotel description B',
    location: 'Hotel location B',
    city: 'Hotel city B'
  }
]

describe('The Hotels store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    global.fetch = vi.fn()
  })

  test('Initializes with correct state', () => {
    const store = useHotelsStore()
    expect(store.hotels).toEqual([])
    expect(store.originalHotels).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.hasError).toBe(false)
    expect(store.compareList).toEqual([])
    expect(store.bookedHotels).toEqual([])
  })

  test('fetches hotels successfully', async () => {
    const store = useHotelsStore()
    const hotels = getHotels()

    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(hotels)
      } as Response)
    })

    await store.fetchHotels()

    expect(store.isLoading).toBe(false)
    expect(store.hasError).toBe(false)
    expect(store.hotels).toEqual(hotels)
    expect(store.originalHotels).toEqual(hotels)
  })
})
