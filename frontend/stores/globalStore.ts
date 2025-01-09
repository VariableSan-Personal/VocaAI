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

	return {
		notification,
		isDark,
		showNotification,
		toggleDark,
	}
})
