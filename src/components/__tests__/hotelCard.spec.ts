import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Hotel } from '@/types'
import HotelCard from '@/components/HotelCard.vue'

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

describe('HotelCard.vue', () => {
  it('renders hotel details correctly', () => {
    const wrapper = mount(HotelCard, {
      props: { hotel: getHotels()[0] }
    })

    expect(wrapper.find('[data-test="hotel-name"]').text()).toBe(getHotels()[0].name)
    expect(wrapper.find('[data-test="hotel-city"]').text()).toBe(getHotels()[0].location)
    expect(wrapper.find('[data-test="hotel-stars"]').text()).toContain(`${getHotels()[0].stars}`)
    expect(wrapper.find('[data-test="hotel-price-per-night"]').text()).toContain(
      `${getHotels()[0].price}$ per night`
    )
  })

  it('emits addToCompare event with hotel data when Compare button is clicked', async () => {
    const wrapper = mount(HotelCard, {
      props: { hotel: getHotels()[0] }
    })

    await wrapper.find('[data-test="compare-hotel-button"]').trigger('click')
    expect(wrapper.emitted().addToCompare).toBeTruthy()
    expect(wrapper.emitted().addToCompare[0]).toEqual([getHotels()[0]])
  })

  it('emits bookRoom event with hotel data when Book a room button is clicked', async () => {
    const wrapper = mount(HotelCard, {
      props: { hotel: getHotels()[0] }
    })

    await wrapper.find('[data-test="book-room-hotel-button"]').trigger('click')
    expect(wrapper.emitted().bookRoom).toBeTruthy()
    expect(wrapper.emitted().bookRoom[0]).toEqual([getHotels()[0]])
  })
})
