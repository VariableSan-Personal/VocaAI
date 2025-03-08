import { AIServiceValidationError, type AIServiceConfig, type ConfigField } from '../lib'

export abstract class AbstractAIService {
	protected config: AIServiceConfig
	protected SOURCE_LANGUAGE = 'English'
	protected TARGET_LANGUAGE = 'Russian'

	/**
	 * Creates an instance of the AI service.
	 * @param {AIServiceConfig} config - Configuration settings for the AI service
	 * @param {boolean} [instantValidation=true] - If true, validates the config immediately upon construction. Defaults to true.
	 * @throws {AIServiceValidationError} When instantValidation is true and the config validation fails
	 */
	constructor(config: AIServiceConfig, instantValidation = true) {
		if (instantValidation) {
			this.validateConfig(config)
		}
		this.config = config
	}

	public abstract generateSuggestion(word: string, examples?: string[]): Promise<string>
	public abstract getName(): string
	public abstract getConfigFields(): ConfigField[]

	/**
	 * Validates the configuration object.
	 * @param config - The configuration object to validate.
	 * @throws {AIServiceValidationError} If a required field is missing or a field value is out of range.
	 */
	public validateConfig(config: AIServiceConfig): void {
		// TODO: Add Zod schema validation for the config object

		const configFields = this.getConfigFields()

		for (const field of configFields) {
			if (field.required && !config[field.name]) {
				throw new AIServiceValidationError(`Missing required field: ${field.label}`)
			}

			if (field.type === 'number' && config[field.name]) {
				const value = Number(config[field.name])
				if (field.min !== undefined && value < field.min) {
					throw new AIServiceValidationError(`${field.label} must be at least ${field.min}`)
				}
				if (field.max !== undefined && value > field.max) {
					throw new AIServiceValidationError(`${field.label} must be at most ${field.max}`)
				}
			}
		}
	}

	public formatGeneratedSuggestion(text: string): { original: string; translated: string } {
		const [original, translated] = text.split('|')
		return {
			original,
			translated,
		}
	}
}
