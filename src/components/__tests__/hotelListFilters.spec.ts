import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import HotelListFilters from '@/components/HotelListFilters.vue'
import type { Hotel } from '@/types'
import { useHotelsStore } from '@/stores/hotels'

describe('HotelListFilters.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(HotelListFilters)

    const orderOptions = wrapper.findAll('option')
    expect(orderOptions.length).toBe(3)
  })

  it('renders order options', () => {
    const wrapper = mount(HotelListFilters)
    const orderOptions = wrapper.findAll('option')
    expect(orderOptions.length).toBe(3)
    expect(orderOptions.at(0)?.text()).toBe('Price')
    expect(orderOptions.at(1)?.text()).toBe('Stars')
    expect(orderOptions.at(2)?.text()).toBe('Name')
  })

  it('renders filter fields', () => {
    const wrapper = mount(HotelListFilters)
    const minPriceInput = wrapper.find('[data-test="minPrice"]')
    const maxPriceInput = wrapper.find('[data-test="maxPrice"]')
    const minStarsInput = wrapper.find('[data-test="minStars"]')

    expect(minPriceInput.exists()).toBe(true)
    expect(maxPriceInput.exists()).toBe(true)
    expect(minStarsInput.exists()).toBe(true)
  })

  it('handles clear filter correctly', async () => {
    const store = useHotelsStore()
    const fetchHotelsMock = vi.spyOn(store, 'fetchHotels')
    const wrapper = mount(HotelListFilters)
    const clearButton = wrapper.find('button:not([type="submit"])')
    await clearButton.trigger('click')

    expect((wrapper.vm as any).filters.minPrice).toBe(0)
    expect((wrapper.vm as any).filters.maxPrice).toBe(1000)
    expect((wrapper.vm as any).filters.minStars).toBe(1)
    expect((wrapper.vm as any).selectedOrder).toBe('price')
    expect(fetchHotelsMock).toHaveBeenCalled()
  })
})
