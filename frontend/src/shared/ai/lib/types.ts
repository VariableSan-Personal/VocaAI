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

export interface ServiceMetadata {
  name: string
  configFields: ConfigField[]
}

export interface AIServiceConfig {
  apiKey: string
  [key: string]: unknown
}
