import type { ServiceMetadata } from '../lib'
import { AbstractAIService } from './abstract'

export class GoogleAIService extends AbstractAIService {
  getName(): string {
    return 'Google AI'
  }

  getMetadata(): ServiceMetadata {
    return {
      name: 'Google AI',
      configFields: [
        {
          name: 'apiKey',
          label: 'API Ключ',
          type: 'text',
          required: true,
        },
        {
          name: 'temperatureParam',
          label: 'Temperature Parameter',
          type: 'number',
          required: true,
          min: 0,
          max: 1,
          defaultValue: 0.5,
        },
        {
          name: 'maxTokens',
          label: 'Максимум токенов',
          type: 'number',
          required: true,
          min: 1,
          max: 4096,
          defaultValue: 2048,
        },
      ],
    }
  }

  async generateSuggestion(prompt: string): Promise<string> {
    console.info(prompt)
    return 'Google AI suggestion'
  }
}
