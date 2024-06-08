import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import HotelListFilters from '@/components/HotelListFilters.vue'
import { useHotelsStore } from '@/stores/hotels'

describe('HotelListFilters.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', async () => {
    const wrapper = mount(HotelListFilters)
    await wrapper.find('button').trigger('click')

    const orderOptions = wrapper.findAll('option')
    expect(orderOptions.length).toBe(3)
  })

  it('renders order options', async () => {
    const wrapper = mount(HotelListFilters)
    await wrapper.find('button').trigger('click')
    const orderOptions = wrapper.findAll('option')
    expect(orderOptions.length).toBe(3)
    expect(orderOptions.at(0)?.text()).toBe('Price')
    expect(orderOptions.at(1)?.text()).toBe('Stars')
    expect(orderOptions.at(2)?.text()).toBe('Name')
  })

  it('renders filter fields', async () => {
    const wrapper = mount(HotelListFilters)
    await wrapper.find('button').trigger('click')
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

    await wrapper.find('button').trigger('click')

    const clearButton = wrapper.find('[data-test="clear-filters-button"]')
    await clearButton.trigger('click')

    expect((wrapper.vm as any).filters.minPrice).toBe(0)
    expect((wrapper.vm as any).filters.maxPrice).toBe(1000)
    expect((wrapper.vm as any).filters.minStars).toBe(1)
    expect((wrapper.vm as any).selectedOrder).toBe('price')
    expect(fetchHotelsMock).toHaveBeenCalled()
  })
})
