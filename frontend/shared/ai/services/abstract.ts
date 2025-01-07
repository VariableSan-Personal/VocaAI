import type { AIServiceConfig, ConfigField } from '../lib'

export abstract class AbstractAIService {
	protected config: AIServiceConfig

	constructor(config: AIServiceConfig) {
		this.config = config
	}

	abstract generateSuggestion(prompt: string): Promise<string>
	abstract getName(): string
	abstract getConfigFields(): ConfigField[]

	protected validateConfig(config: AIServiceConfig): void {
		const configFields = this.getConfigFields()

		for (const field of configFields) {
			if (field.required && !config[field.name]) {
				throw new Error(`Missing required field: ${field.label}`)
			}

			if (field.type === 'number' && config[field.name]) {
				const value = Number(config[field.name])
				if (field.min !== undefined && value < field.min) {
					throw new Error(`${field.label} must be at least ${field.min}`)
				}
				if (field.max !== undefined && value > field.max) {
					throw new Error(`${field.label} must be at most ${field.max}`)
				}
			}
		}
	}
}
