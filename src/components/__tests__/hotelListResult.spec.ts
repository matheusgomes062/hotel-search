import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import HotelListResult from '@/components/HotelListResult.vue'
import BookRoomModal from '@/components/BookRoomModal.vue'
import HotelCard from '@/components/HotelCard.vue'
import type { Hotel } from '@/types'
import { useHotelsStore } from '@/stores/hotels'

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

describe('HotelListResult.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders a list of hotels', () => {
    const hotels = getHotels()
    const wrapper = mount(HotelListResult, {
      props: { hotels: getHotels() }
    })

    const hotelCards = wrapper.findAllComponents(HotelCard)
    expect(hotelCards).toHaveLength(hotels.length)
  })

  it('handles addToCompare event', async () => {
    const hotels = getHotels()
    const wrapper = mount(HotelListResult, {
      props: {
        hotels: hotels
      }
    })

    const store = useHotelsStore()
    const addHotelToCompareMock = vi.spyOn(store, 'addHotelToCompare')

    await wrapper.findComponent(HotelCard).vm.$emit('addToCompare', hotels[0])
    expect(addHotelToCompareMock).toHaveBeenCalledWith(hotels[0])
  })

  it('handles bookRoom event and opens BookRoomModal', async () => {
    const hotels = getHotels()
    const wrapper = mount(HotelListResult, {
      props: {
        hotels: hotels
      }
    })

    wrapper.findComponent(HotelCard).vm.$emit('bookRoom', hotels[0])
    expect((wrapper.vm as any).userWantsToBookARoom).toStrictEqual(hotels[0])

    await wrapper.vm.$nextTick()

    const modal = wrapper.findComponent(BookRoomModal)
    expect(modal.exists()).toBe(true)
    expect(modal.props('hotel')).toStrictEqual(hotels[0])
  })

  it('closes BookRoomModal', async () => {
    const hotels = getHotels()
    const wrapper = mount(HotelListResult, {
      props: {
        hotels: hotels
      }
    })

    wrapper.findComponent(HotelCard).vm.$emit('bookRoom', hotels[0])
    await wrapper.vm.$nextTick()

    const modal = wrapper.findComponent(BookRoomModal)
    modal.vm.$emit('close')
    expect((wrapper.vm as any).userWantsToBookARoom).toBe(null)
  })
})
