import { AIServiceType, type AIServiceConfig } from '../lib'
import type { AbstractAIService } from './abstract'
import { ChatGPTService } from './chatgpt'
import { ClaudeService } from './claude'
import { GoogleAIService } from './google-ai'

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
      case AIServiceType.GoogleAI:
        this.currentService = new GoogleAIService(config)
        break
      default:
        throw new Error('Unknown service type')
    }
    return this.currentService
  }

  getCurrentService(): AbstractAIService | null {
    return this.currentService
  }
}
