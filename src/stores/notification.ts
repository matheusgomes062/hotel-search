import { reactive } from 'vue'

export interface Notification {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}

const notifications = reactive<Notification[]>([])

let idCounter = 0

export const useNotifications = () => {
  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    notifications.push({ id: idCounter++, type, message })
    setTimeout(() => {
      notifications.splice(
        notifications.findIndex((n) => n.id === idCounter - 1),
        1
      )
    }, 3000)
  }

  return { notifications, addNotification }
}
