<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40 pb-10">
    <main class="grid flex-1 items-start gap-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
