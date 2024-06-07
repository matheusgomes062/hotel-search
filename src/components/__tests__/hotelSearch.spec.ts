import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import HotelSearch from '@/components/HotelSearch.vue'
import { useHotelsStore } from '@/stores/hotels'

describe('HotelSearch.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    global.fetch = vi.fn()
  })

  it('renders the form with initial values', () => {
    const wrapper = mount(HotelSearch)

    expect(wrapper.find('[data-test="destination-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="checkIn-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="checkOut-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="roomCount-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="guestCount-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="search-button"]').exists()).toBe(true)
  })

  it('updates data when input fields change', async () => {
    const wrapper = mount(HotelSearch)

    const destinationInput = wrapper.find('[data-test="destination-input"]')
    await destinationInput.setValue('New York')
    expect((wrapper.vm as any).destination).toBe('New York')

    const checkInInput = wrapper.find('[data-test="checkIn-input"]')
    await checkInInput.setValue('2024-06-10')
    expect((wrapper.vm as any).checkInDate).toBe('2024-06-10')

    const checkOutInput = wrapper.find('[data-test="checkOut-input"]')
    await checkOutInput.setValue('2024-06-15')
    expect((wrapper.vm as any).checkOutDate).toBe('2024-06-15')

    const roomCountInput = wrapper.find('[data-test="roomCount-input"]')
    await roomCountInput.setValue('2')
    expect((wrapper.vm as any).roomCount).toBe(2)

    const guestCountInput = wrapper.find('[data-test="guestCount-input"]')
    await guestCountInput.setValue('3')
    expect((wrapper.vm as any).guestCount).toBe(3)
  })

  it('calls fetchHotels with correct parameters on form submit', async () => {
    const store = useHotelsStore()
    const fetchHotelsMock = vi.spyOn(store, 'fetchHotels')
    const wrapper = mount(HotelSearch)

    await wrapper.find('[data-test="destination-input"]').setValue('New York')
    await wrapper.find('[data-test="checkIn-input"]').setValue('2024-06-10')
    await wrapper.find('[data-test="checkOut-input"]').setValue('2024-06-15')
    await wrapper.find('[data-test="roomCount-input"]').setValue(2)
    await wrapper.find('[data-test="guestCount-input"]').setValue(3)

    await wrapper.find('form').trigger('submit.prevent')

    expect(fetchHotelsMock).toHaveBeenCalledWith({
      city: 'New York',
      checkIn: '2024-06-10',
      checkOut: '2024-06-15',
      roomCount: 2,
      guestCount: 3
    })
  })
})
