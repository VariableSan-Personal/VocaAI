import type { Notification } from '@/shared'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGlobalStore = defineStore('global', () => {
	const notification = reactive<Notification>({
		show: false,
		message: '',
		color: 'success',
		timeout: 3000,
	})

	const isDark = useDark({
		selector: 'html',
		attribute: 'data-theme',
		valueDark: 'dark',
		valueLight: 'light',
	})

	const toggleDark = useToggle(isDark)

	const showNotification = (
		message: string,
		params?: Pick<Partial<Notification>, 'color' | 'timeout'>
	) => {
		notification.message = message
		notification.show = true

		if (params?.color) {
			notification.color = params.color
		}
		if (params?.timeout) {
			notification.timeout = params.timeout
		}
	}

	const showError = (message: string) => {
		showNotification(message, { color: 'error' })
	}
	const showSuccess = (message: string) => {
		showNotification(message, { color: 'success' })
	}
	const showWarning = (message: string) => {
		showNotification(message, { color: 'warning' })
	}
	const showInfo = (message: string) => {
		showNotification(message, { color: 'info' })
	}

	return {
		notification,
		isDark,
		showNotification,
		toggleDark,
		showError,
		showSuccess,
		showWarning,
		showInfo,
	}
})
