import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useHotelsStore } from '@/stores/hotels'
import type { Hotel, HotelBookingParams, HotelSearchParams } from '@/types'
import { ref } from 'vue'
import SidebarCompare from '@/components/SidebarCompare.vue'
import exp from 'constants'

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

vi.mock('vue-router', () => ({
  resolve: vi.fn()
}))

describe('Sidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    global.fetch = vi.fn()
  })

  it('renders properly', async () => {
    const wrapper = mount(SidebarCompare, {
      props: {
        comparedHotels: getHotels()
      }
    })

    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain('Compare Hotels')
  })
  it('toggles sidebar visibility when button is clicked', async () => {
    const wrapper = mount(SidebarCompare, {
      props: {
        comparedHotels: getHotels()
      }
    })

    const button = wrapper.get('[data-test="toggle-sidebar"]')
    await button.trigger('click')
    // it starts as true, then changes to false
    expect((wrapper.vm as any).showSidebar).toBe(false)
  })

  it('clears all compared hotels when Clear All button is clicked', async () => {
    const wrapper = mount(SidebarCompare, {
      props: {
        comparedHotels: getHotels()
      }
    })
    const store = useHotelsStore()

    const clearAllButton = wrapper.get('[data-test="clear-all"]')

    const clearComparedHotelsMock = vi.spyOn(store, 'clearComparedHotels')

    await clearAllButton.trigger('click')

    expect(clearComparedHotelsMock).toHaveBeenCalled()
  })

  it('removes a hotel from comparison when Remove button is clicked', async () => {
    const hotelToRemove = getHotels()[0]
    const wrapper = mount(SidebarCompare, {
      props: {
        comparedHotels: [hotelToRemove]
      }
    })
    const store = useHotelsStore()

    const removeButton = wrapper.find('[data-test="remove-hotel"]')

    const removeHotelFromCompareMock = vi.spyOn(store, 'removeHotelFromCompare')

    await removeButton.trigger('click')

    expect(removeHotelFromCompareMock).toHaveBeenCalledWith(hotelToRemove)
  })

  it('renders the sidebar correctly with no hotels selected for comparison', async () => {
    const wrapper = mount(SidebarCompare, {
      props: {
        comparedHotels: []
      }
    })

    expect(wrapper.text()).toContain('No hotels selected for comparison.')
  })

  it('renders the sidebar correctly with hotels selected for comparison', async () => {
    const hotels = getHotels()
    const wrapper = mount(SidebarCompare, {
      props: {
        comparedHotels: hotels
      }
    })

    for (const hotel of hotels) {
      expect(wrapper.text()).toContain(hotel.name)
      expect(wrapper.text()).toContain(hotel.stars)
      expect(wrapper.text()).toContain(hotel.price)
      expect(wrapper.text()).toContain(hotel.roomCount)
    }
  })
})
