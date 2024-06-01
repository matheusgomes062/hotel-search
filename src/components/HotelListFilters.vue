<template>
  <div class="p-4 bg-gray-100 rounded-b-lg">
    <form @submit.prevent="emitFilterChange">
      <div class="flex flex-wrap flex-row items-end gap-4 justify-between">
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
          <label for="{{ field.name }}" class="block mb-2 font-medium">{{ field.label }}:</label>
          <input
            v-model="filters[field.name]"
            :type="field.type"
            :id="field.name"
            class="w-full p-2 border rounded-md outline-none border-none"
            :min="field.min"
            :max="field.max"
          />
        </div>
        <button
          type="submit"
          class="px-4 h-10 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
        >
          Apply Filters
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import type { OrderOption, FilterField } from '@/types'

const emit = defineEmits(['filterChange'])

const selectedOrder = ref<string>('price')
const filters = ref<Record<string, number>>({
  // Use Record for dynamic filter keys
  minPrice: 0,
  maxPrice: 1000,
  minStars: 1,
  maxStars: 5
})

const orderOptions: OrderOption[] = [
  { value: 'price', text: 'Price' },
  { value: 'stars', text: 'Stars' },
  { value: 'name', text: 'Name' }
]

const filterFields: FilterField[] = [
  { name: 'minPrice', label: 'Min Price', type: 'number', min: 0 },
  { name: 'maxPrice', label: 'Max Price', type: 'number', max: 1000 },
  { name: 'minStars', label: 'Min Stars', type: 'number', min: 1 },
  { name: 'maxStars', label: 'Max Stars', type: 'number', max: 5 }
]

const emitFilterChange = () => {
  emit('filterChange', {
    order: selectedOrder.value,
    ...filters.value
  })
}
</script>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
