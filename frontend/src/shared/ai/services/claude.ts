import type { ServiceMetadata } from '../lib'
import { AbstractAIService } from './abstract'

export class ClaudeService extends AbstractAIService {
  getName(): string {
    return 'Claude'
  }

  getMetadata(): ServiceMetadata {
    return {
      name: 'Claude',
      configFields: [
        {
          name: 'apiKey',
          label: 'API Ключ',
          type: 'text',
          required: true,
        },
        {
          name: 'creativity',
          label: 'Креативность',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          defaultValue: 50,
        },
      ],
    }
  }

  async generateSuggestion(prompt: string): Promise<string> {
    console.info(prompt)
    return 'Claude suggestion'
  }
}
