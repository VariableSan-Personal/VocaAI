import { AIServiceType, SERVICE_NAMES, type ConfigField } from '../lib'
import { AbstractAIService } from './abstract'

export class ChatGPTService extends AbstractAIService {
	getName(): string {
		return SERVICE_NAMES[AIServiceType.ChatGPT]
	}

	getConfigFields(): ConfigField[] {
		return [
			{
				name: 'apiKey',
				label: 'API Key',
				type: 'text',
				required: true,
			},
			{
				name: 'model',
				label: 'Model',
				type: 'select',
				required: true,
				options: [
					{ value: 'gpt-4', label: 'GPT-4' },
					{ value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
				],
			},
			{
				name: 'temperature',
				label: 'Temperature',
				type: 'number',
				required: true,
				min: 0,
				max: 1,
			},
		]
	}

	async generateSuggestion(prompt: string): Promise<string> {
		console.info(prompt)
		return 'ChatGPT suggestion'
	}
}
