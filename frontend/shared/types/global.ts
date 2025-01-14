export interface Notification {
	show: boolean
	message: string
	color: 'success' | 'info' | 'warning' | 'error'
	timeout: number
}

export type CustomPageMeta = Partial<{
	showBack: boolean
	hideBottomNav: boolean
	title: string
}>
