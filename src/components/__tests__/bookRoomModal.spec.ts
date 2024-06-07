import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Hotel } from '@/types'
import BookRoomModal from '@/components/BookRoomModal.vue'

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

describe('BookRoomModal.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    global.fetch = vi.fn()
  })

  it('renders hotel name and description', () => {
    const hotel = getHotels()[0]
    const wrapper = mount(BookRoomModal, {
      props: { hotel: hotel }
    })
    expect(wrapper.find('[data-test="hotel-name"]').text()).toBe(hotel.name)
    expect(wrapper.find('[data-test="hotel-description"]').text()).toBe(hotel.description)
  })

  it('closes modal when close button is clicked', async () => {
    const hotel = getHotels()[0]
    const wrapper = mount(BookRoomModal, {
      props: { hotel: hotel }
    })
    await wrapper.find('[data-test="close-modal-button"]').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('submits booking data when form is submitted', async () => {
    const hotel = getHotels()[0]
    const wrapper = mount(BookRoomModal, {
      props: { hotel: hotel }
    })
    const bookingData = {
      name: 'John Doe',
      email: 'john@example.com',
      checkInDate: '2024-06-10',
      checkOutDate: '2024-06-15',
      roomCount: 2,
      guestCount: 3
    }
    await wrapper.find('[data-test="name-input"]').setValue(bookingData.name)
    await wrapper.find('[data-test="email-input"]').setValue(bookingData.email)
    await wrapper.find('[data-test="checkIn-input"]').setValue(bookingData.checkInDate)
    await wrapper.find('[data-test="checkOut-input"]').setValue(bookingData.checkOutDate)
    await wrapper.find('[data-test="roomCount-input"]').setValue(bookingData.roomCount)
    await wrapper.find('[data-test="guestCount-input"]').setValue(bookingData.guestCount)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
