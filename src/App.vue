<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <main class="grid flex-1 items-start gap-4 p-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
