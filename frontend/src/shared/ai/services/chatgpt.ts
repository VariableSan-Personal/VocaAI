import type { ServiceMetadata } from '../lib'
import { AbstractAIService } from './abstract'

export class ChatGPTService extends AbstractAIService {
  getName(): string {
    return 'ChatGPT'
  }

  getMetadata(): ServiceMetadata {
    return {
      name: 'ChatGPT',
      configFields: [
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'text',
          required: true,
        },
        /* {
          name: 'model',
          label: 'Model',
          type: 'select',
          required: true,
          options: [
            { value: 'gpt-4', label: 'GPT-4' },
            { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          ],
          defaultValue: 'gpt-4',
        },
        {
          name: 'temperature',
          label: 'Temperature',
          type: 'number',
          required: true,
          min: 0,
          max: 1,
          defaultValue: 0.7,
        }, */
      ],
    }
  }

  async generateSuggestion(prompt: string): Promise<string> {
    console.info(prompt)
    return 'ChatGPT suggestion'
  }
}
