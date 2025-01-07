import type { ConfigField } from '../lib'
import { AbstractAIService } from './abstract'

interface GeminiResponse {
	candidates: Array<{
		content: {
			parts: Array<{
				text: string
			}>
		}
	}>
}

export class GeminiService extends AbstractAIService {
	getName(): string {
		return 'Gemini'
	}

	getConfigFields(): ConfigField[] {
		return [
			{
				name: 'apiKey',
				label: 'API Key',
				type: 'text',
				required: true,
			},
		]
	}

	async generateSuggestion(prompt: string): Promise<string> {
		const data = await useAPIFetch<GeminiResponse>(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.config.apiKey}`,
			{
				method: 'POST',
				body: {
					contents: [
						{
							parts: [{ text: prompt }],
						},
					],
				},
			}
		)

		const text = data.candidates?.[0]?.content?.parts?.[0]?.text

		if (!text) {
			return 'Invalid response format from Gemini API'
		}

		return text
	}
}
