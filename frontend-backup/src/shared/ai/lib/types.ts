export interface ConfigField {
  name: string
  label: string
  type: 'text' | 'number' | 'select'
  required: boolean
  options?: Array<{ value: string; label: string }>
  defaultValue?: unknown
  min?: number
  max?: number
}

export interface AIServiceConfig {
  [key: string]: unknown
}
