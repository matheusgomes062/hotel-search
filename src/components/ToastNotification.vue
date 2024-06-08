<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

type ToastType = 'success' | 'error' | 'info'

const props = defineProps({
  type: {
    type: String as () => ToastType,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const isVisible = ref(true)

const toastTypeClasses: Record<ToastType, string> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white'
}

const dismiss = () => {
  isVisible.value = false
}

onMounted(() => {
  setTimeout(dismiss, props.duration)
})
</script>

<template>
  <div
    v-if="isVisible"
    :class="`fixed bottom-24 right-5 p-4 rounded shadow-lg transition-opacity duration-300 ease-in-out ${toastTypeClasses[type]}`"
    @click="dismiss"
  >
    {{ message }}
  </div>
</template>

<style scoped></style>
