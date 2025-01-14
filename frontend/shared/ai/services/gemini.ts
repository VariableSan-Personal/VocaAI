import { useAIFetch } from '~/composables/useAIFetch'
import {
	AIServiceType,
	SERVICE_NAMES,
	type ConfigField,
	type GeminiRequestBody,
	type GeminiResponse,
} from '../lib'
import { AbstractAIService } from './abstract'

export class GeminiService extends AbstractAIService {
	private VALUES_RANGE = 2.0
	private ORIGINAL = 'English'
	private TRANSLATED = 'Russian'

	getName(): string {
		return SERVICE_NAMES[AIServiceType.Gemini]
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
				options: [{ value: 'gemini-1.5-flash', label: 'Gemini 1.5 flash' }],
			},
		]
	}

	async generateSuggestion(word: string): Promise<string> {
		const config = useRuntimeConfig()
		const PROMPT = `Generate a comprehensive and complex sentence in English using the word "${word}". The response should be in the format: "${this.ORIGINAL} sentence|${this.TRANSLATED} sentence".`

		const body: Partial<GeminiRequestBody> = {
			contents: [
				{
					parts: [{ text: PROMPT }],
				},
			],
			generationConfig: {
				temperature: Math.random() * this.VALUES_RANGE,
			},
		}

		const data = await useAIFetch<GeminiResponse>(
			`${config.public.geminiUrl}/${this.config.model}:generateContent?key=${this.config.apiKey}`,
			{
				method: 'POST',
				body,
			}
		)

		const text = this.extractText(data)

		if (!text) {
			throw new Error('Invalid response format from Gemini API')
		}

		return text
	}

	extractText(data: GeminiResponse) {
		return data.candidates?.[0]?.content?.parts?.[0]?.text
	}
}
