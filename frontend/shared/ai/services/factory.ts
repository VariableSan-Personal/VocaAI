import { AIServiceError, AIServiceType, type AIServiceConfig, type ConfigField } from '../lib'
import type { AbstractAIService } from './abstract'
import { GeminiService } from './gemini'

export class AIServiceFactory {
	private static instance: AIServiceFactory
	private currentService: AbstractAIService | null = null

	private constructor() {}

	public static getInstance(): AIServiceFactory {
		if (!AIServiceFactory.instance) {
			AIServiceFactory.instance = new AIServiceFactory()
		}
		return AIServiceFactory.instance
	}

	/**
	 * Creates and initializes an instance of a specific AI service based on the provided type and configuration.
	 * @throws {AIServiceError} When an unsupported AI service type is provided
	 * @throws {AIServiceValidationError} When the provided configuration is invalid for the selected service
	 */
	public createService(type: AIServiceType, config: AIServiceConfig): AbstractAIService {
		switch (type) {
			case AIServiceType.Gemini:
				this.currentService = new GeminiService(config)
				break
			default:
				throw new AIServiceError(`Unsupported AI service type: ${type}`)
		}
		return this.currentService
	}

	public getServiceConfigFields(type: AIServiceType): ConfigField[] {
		switch (type) {
			case AIServiceType.Gemini:
				return new GeminiService({}, false).getConfigFields()
			default:
				throw new AIServiceError(`Unsupported AI service type: ${type}`)
		}
	}

	public getCurrentService(): AbstractAIService | null {
		return this.currentService
	}
}
