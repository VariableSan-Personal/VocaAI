import type { Color, Notification } from '@/shared'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const notification = reactive<Notification>({
    show: false,
    message: '',
    color: 'blue',
    timeout: 3000,
  })

  const showNotification = (message: string, params?: Partial<Notification>) => {
    notification.message = message
    notification.show = true

    if (!params) {
      return
    }

    if (params.color) {
      notification.color = params.color
    }
    if (params.timeout) {
      notification.timeout = params.timeout
    }
  }

  return {
    notification,
    showNotification,
  }
})
