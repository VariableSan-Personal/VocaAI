export interface SelectOption {
	value: string
	label: string
}

export interface ConfigField {
	name: string
	label: string
	type: 'text' | 'number' | 'select'
	required: boolean
	options?: SelectOption[]
	min?: number
	max?: number
}

export interface AIServiceConfig {
	[key: string]: never
}
