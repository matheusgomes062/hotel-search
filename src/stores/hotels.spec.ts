import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useHotelsStore } from '@/stores/hotels'
import type { Hotel, HotelBookingParams } from '@/types'

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

  test('handles fetch hotels error', async () => {
    const store = useHotelsStore()
    const hotels = getHotels()

    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve(hotels)
      } as Response)
    })

    await store.fetchHotels()

    expect(store.isLoading).toBe(false)
    expect(store.hasError).toBe(true)
    expect(store.hotels).toEqual([])
    expect(store.originalHotels).toEqual([])
  })

  test('adds and removes hotel to/from compare list', async () => {
    const store = useHotelsStore()
    const hotels = getHotels()

    store.addHotelToCompare(hotels[0])
    expect(store.compareList.some((hotel) => hotel.id === hotels[0].id)).toBe(true)
    expect(store.compareList.length).toBe(1)
    expect(store.compareList[0]).toEqual(hotels[0])

    store.removeHotelFromCompare(hotels[0])
    expect(store.compareList.length).toBe(0)
  })

  test('clears compared hotels', () => {
    const store = useHotelsStore()
    const hotels = getHotels()

    store.addHotelToCompare(hotels[0])
    expect(store.compareList.some((hotel) => hotel.id === hotels[0].id)).toBe(true)

    store.clearComparedHotels()
    expect(store.compareList.length).toBe(0)
  })

  test('filters hotels', async () => {
    const store = useHotelsStore()
    const hotels = getHotels()

    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(hotels)
      } as Response)
    })

    await store.fetchHotels()

    store.filterHotels('price', { minStars: 4 })
    expect(store.hotels).toEqual([hotels[0], hotels[1]])

    store.filterHotels('price', { maxPrice: 120 })
    expect(store.hotels).toEqual([hotels[0]])
  })

  test('books a hotel', () => {
    const store = useHotelsStore()
    const bookingParams: HotelBookingParams = {
      name: 'John Doe',
      email: 'test@test.com',
      checkInDate: '2023-06-05',
      checkOutDate: '2023-06-10',
      hotel: getHotels()[0],
      roomCount: 2,
      guestCount: 4
    }

    store.bookHotel(bookingParams)
    expect(store.bookedHotels.some((hotel) => hotel.email === bookingParams.email)).toBe(true)
  })

  test('computes hotels count correctly', async () => {
    const store = useHotelsStore()
    const hotels = getHotels()

    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(hotels)
      } as Response)
    })

    await store.fetchHotels()

    expect(store.hotelsCount).toBe(2)
  })

  test('computes compare count correctly', () => {
    const store = useHotelsStore()
    const hotels = getHotels()

    store.addHotelToCompare(hotels[0])
    expect(store.compareCount).toBe(1)
  })
})
