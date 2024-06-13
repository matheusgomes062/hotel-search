<script setup lang="ts">
import type { LabelProps } from '@/types/index.d.ts'

defineProps<LabelProps>()
</script>

<template>
  <label
    :for="id"
    class="text-sm font-medium align-top"
    :class="[
      {
        'text-destructive': error,
        'text-success': success,
        'text-gray-700': !error && !success
      }
    ]"
  >
    <slot />
  </label>
</template>

<style scoped></style>
