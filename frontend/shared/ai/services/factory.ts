import { AIServiceType, type AIServiceConfig, type ConfigField } from '../lib'
import type { AbstractAIService } from './abstract'
import { GeminiService } from './gemini'

export class AIServiceFactory {
	private static instance: AIServiceFactory
	private currentService: AbstractAIService | null = null

	private constructor() {}

	static getInstance(): AIServiceFactory {
		if (!AIServiceFactory.instance) {
			AIServiceFactory.instance = new AIServiceFactory()
		}
		return AIServiceFactory.instance
	}

	/**
	 * Creates and initializes a specific AI service instance based on the provided type and configuration.
	 * @throws {AIServiceValidationError} If an unsupported service type is provided or if a required field is missing or a field value is out of range.
	 */
	createService(type: AIServiceType, config: AIServiceConfig): AbstractAIService {
		switch (type) {
			case AIServiceType.Gemini:
				this.currentService = new GeminiService(config)
				break
		}
		return this.currentService
	}

	getServiceConfigFields(type: AIServiceType): ConfigField[] {
		switch (type) {
			case AIServiceType.Gemini:
				return new GeminiService({}, false).getConfigFields()
		}
	}

	getCurrentService(): AbstractAIService | null {
		return this.currentService
	}
}
