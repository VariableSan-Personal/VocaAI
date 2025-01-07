import { AIServiceType, type AIServiceConfig, type ConfigField } from '../lib'
import type { AbstractAIService } from './abstract'
import { ChatGPTService } from './chatgpt'
import { ClaudeService } from './claude'
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

	createService(type: AIServiceType, config: AIServiceConfig): AbstractAIService {
		switch (type) {
			case AIServiceType.ChatGPT:
				this.currentService = new ChatGPTService(config)
				break
			case AIServiceType.Claude:
				this.currentService = new ClaudeService(config)
				break
			case AIServiceType.Gemini:
				this.currentService = new GeminiService(config)
				break
		}
		return this.currentService
	}

	getServiceConfigFields(type: AIServiceType): ConfigField[] {
		switch (type) {
			case AIServiceType.ChatGPT:
				return new ChatGPTService({}, false).getConfigFields()
			case AIServiceType.Claude:
				return new ClaudeService({}, false).getConfigFields()
			case AIServiceType.Gemini:
				return new GeminiService({}, false).getConfigFields()
		}
	}

	getCurrentService(): AbstractAIService | null {
		return this.currentService
	}
}
