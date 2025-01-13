export interface Notification {
	show: boolean
	message: string
	color: string
	timeout: number
}

export type CustomPageMeta = Partial<{
	showBack: boolean
	hideBottomNav: boolean
	title: string
}>
