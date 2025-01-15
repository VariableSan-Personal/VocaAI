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
	private TEMPERATURE_RANGE = 2.0
	private TOP_P_RANGE = 1.0

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

	async generateSuggestion(word: string, examples?: string[]): Promise<string> {
		const config = useRuntimeConfig()
		const prompt = this.generatePrompt(word, examples)

		const body: Partial<GeminiRequestBody> = {
			contents: [
				{
					parts: [{ text: prompt }],
				},
			],
			generationConfig: {
				temperature: parseFloat((Math.random() * this.TEMPERATURE_RANGE).toFixed(5)),
				topP: parseFloat((Math.random() * this.TOP_P_RANGE).toFixed(5)),
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

	private generatePrompt(word: string, examples?: string[]): string {
		const PROMPT = `
      Find a unique and complex sentence in ${this.SOURCE_LANGUAGE} using the word "${word}" from real books.
      Focus on using advanced grammatical structures, such as conditional phrases, participial constructions, or passive voice and so on. The response should be in the format: "${this.SOURCE_LANGUAGE} sentence|${this.TARGET_LANGUAGE} sentence", since i need to parse this text lately, so it's important text to be "sentence 1|sentence 2". Also, it should be in markdown format and make the main word **bold**. Don't use tables, but a simple text format.
    `

		const EXAMPLE_AVOIDANCES = examples?.length
			? `
        Avoid structures similar to:
        ${examples.map((example, index) => `${index + 1}. ${example}`).join('\n')}
      `
			: ''

		return `${PROMPT}${EXAMPLE_AVOIDANCES}`
	}
}
