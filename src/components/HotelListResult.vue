<script setup lang="ts">
import type { Hotel } from '@/types'
import HotelCard from '@/components/HotelCard.vue'
import BookRoomModal from '@/components/BookRoomModal.vue'
import { useHotelsStore } from '@/stores/hotels'
import { useNotifications } from '@/stores/notification'
import ToastNotification from '@/components/ToastNotification.vue'
import { ref } from 'vue'

const hotelsStore = useHotelsStore()
const notifications = useNotifications()
const allNotifications = notifications.notifications

const props = defineProps<{
  hotels: Hotel[]
}>()

const userWantsToBookARoom = ref<Hotel | null>(null)

const addToCompare = (hotel: Hotel) => {
  hotelsStore.addHotelToCompare(hotel)
}

const bookRoom = (hotel: Hotel) => {
  userWantsToBookARoom.value = hotel
}

const handleCloseModal = () => {
  userWantsToBookARoom.value = null
  if (hotelsStore.bookedHotels.length > 0) {
    notifySuccess()
  }
}

const notifySuccess = () => notifications.addNotification('success', 'Your booking was successful!')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <HotelCard
      v-for="hotel in props.hotels"
      :key="hotel.id"
      :hotel="hotel"
      @addToCompare="addToCompare"
      @bookRoom="bookRoom"
    />
    <BookRoomModal
      v-if="userWantsToBookARoom"
      :hotel="userWantsToBookARoom"
      @close="handleCloseModal"
    />
    <ToastNotification
      v-for="notification in allNotifications"
      :key="notification.id"
      :type="notification.type"
      :message="notification.message"
    />
  </div>
</template>

<style scoped></style>
