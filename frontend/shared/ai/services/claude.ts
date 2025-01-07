import type { ConfigField } from '../lib'
import { AbstractAIService } from './abstract'

export class ClaudeService extends AbstractAIService {
	getName(): string {
		return 'Claude'
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
				name: 'creativity',
				label: 'Creativity',
				type: 'number',
				required: true,
				min: 0,
				max: 100,
			},
		]
	}

	async generateSuggestion(prompt: string): Promise<string> {
		console.info(prompt)
		return 'Claude suggestion'
	}
}
