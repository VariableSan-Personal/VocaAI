import type { ConfigField } from '../lib'
import { AbstractAIService } from './abstract'

export class GoogleAIService extends AbstractAIService {
	getName(): string {
		return 'Google AI'
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
				label: 'Maximum tokens',
				type: 'number',
				required: true,
				min: 1,
				max: 4096,
				defaultValue: 2048,
			},
		]
	}

	async generateSuggestion(prompt: string): Promise<string> {
		console.info(prompt)
		return 'Google AI suggestion'
	}
}
