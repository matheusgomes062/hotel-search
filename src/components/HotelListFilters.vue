<script setup lang="ts">
import { ref } from 'vue'
import type { OrderOption, FilterFields } from '@/types'
import { useHotelsStore } from '@/stores/hotels'
import InputComponent from './ui/InputComponent.vue'

const hotelsStore = useHotelsStore()
const isFilterOpen = ref<boolean>(false)

const selectedOrder = ref<string>('price')
const filters = ref<Record<string, number>>({
  minPrice: 0,
  maxPrice: 1000,
  minStars: 1
})

const orderOptions: OrderOption[] = [
  { value: 'price', text: 'Price' },
  { value: 'stars', text: 'Stars' },
  { value: 'name', text: 'Name' }
]

const filterFields: FilterFields[] = [
  { name: 'minPrice', label: 'Min Price', type: 'number', min: 0 },
  { name: 'maxPrice', label: 'Max Price', type: 'number', max: 1000 },
  { name: 'minStars', label: 'Min Stars', type: 'number', min: 1 }
]

const handleFilter = async () => {
  hotelsStore.filterHotels(selectedOrder.value, filters.value)
}

const handleClearFilter = async () => {
  filters.value = {
    minPrice: 0,
    maxPrice: 1000,
    minStars: 1
  }
  selectedOrder.value = 'price'
  await hotelsStore.fetchHotels()
}

const hangleToggleFilters = () => {
  isFilterOpen.value = !isFilterOpen.value
}
</script>

<template>
  <div class="p-4 bg-gray-100 rounded-b-lg w-[92%]" v-if="isFilterOpen">
    <form @submit.prevent="handleFilter">
      <div class="flex flex-wrap flex-row items-end gap-4 justify-start">
        <div class="w-full md:w-auto">
          <label for="order" class="block mb-2 font-medium">Order By:</label>
          <select
            id="order"
            v-model="selectedOrder"
            class="w-full p-2 border rounded-md outline-none"
          >
            <option v-for="option in orderOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="w-full md:w-auto" v-for="field in filterFields" :key="field.name">
          <label :for="field.name" class="block mb-2 font-medium">{{ field.label }}:</label>
          <InputComponent
            v-model.number="filters[field.name]"
            :type="field.type"
            :id="field.name"
            :data-test="field.name"
            input-class="w-full md:w-40 mb-0 p-2 rounded-md outline-none border-none"
            :min="field.min"
            :max="field.max"
          />
        </div>
        <button
          data-test="clear-filters-button"
          @click="handleClearFilter"
          class="px-4 py-2 text-white bg-orange-500 font-semibold rounded-full shadow hover:bg-orange-600"
        >
          Clear Filters
        </button>
        <button
          data-test="apply-filters-button"
          type="submit"
          class="px-4 py-2 bg-violet-600 text-white font-semibold rounded-full shadow hover:bg-violet-700"
        >
          Apply Filters
        </button>
      </div>
    </form>
  </div>
  <button
    @click="hangleToggleFilters"
    class="w-[92%] py-2 px-4 bg-violet-600 text-white text-sm font-semibold rounded-b-lg shadow hover:bg-violet-700"
  >
    {{ isFilterOpen ? 'Close Filters' : 'Open Filters' }}
  </button>
</template>

<style scoped></style>
