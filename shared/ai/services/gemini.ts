import { useAIFetch } from '~/composables/useAIFetch'
import {
	AIServiceError,
	AIServiceType,
	AI_SERVICE_NAMES,
	type ConfigField,
	type GeminiRequestBody,
	type GeminiResponse,
} from '../lib'
import { AbstractAIService } from './abstract'

export class GeminiService extends AbstractAIService {
	private TEMPERATURE_RANGE = 2.0
	private TOP_P_RANGE = 1.0
	private MODEL = 'gemini-2.0-flash-lite'

	public getName(): string {
		return AI_SERVICE_NAMES[AIServiceType.Gemini]
	}

	public getConfigFields(): ConfigField[] {
		return [
			{
				name: 'apiKey',
				label: 'API Key',
				type: 'text',
				required: true,
			},
		]
	}

	public async generateSuggestion(word: string, examples?: string[]): Promise<string> {
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
			`${config.public.geminiUrl}/${this.MODEL}:generateContent?key=${this.config.apiKey}`,
			{
				method: 'POST',
				body,
			}
		)

		const text = this.extractText(data)

		if (!text) {
			throw new AIServiceError('Invalid response format from Gemini API')
		}

		return text
	}

	private extractText(data: GeminiResponse): string {
		return data.candidates?.[0]?.content?.parts?.[0]?.text
	}

	private generatePrompt(word: string, examples?: string[]): string {
		const PROMPT = `Create a complex sentence using the word "${word}" in ${this.SOURCE_LANGUAGE}. The sentence should:
      1. Come from authentic literature
      2. Use advanced grammar (conditional phrases, participial constructions, or passive voice)
      3. Follow this exact output format: "${this.SOURCE_LANGUAGE} sentence|${this.TARGET_LANGUAGE} translation"
      4. Make the word "${word}" **bold** in both languages
      5. Return plain text only (no tables)

      Example format:
      The intricate **mechanism** of the watch had been meticulously assembled by the master craftsman.|El intrincado **mecanismo** del reloj había sido ensamblado meticulosamente por el maestro artesano.

      Important: Maintain the exact format with the pipe symbol (|) separating the two sentences, as this will be parsed programmatically.`

		const EXAMPLE_AVOIDANCES = examples?.length
			? `Avoid structures similar to: ${examples.map((example, index) => `${index + 1}. ${example}`).join('\n')}`
			: ''

		return `${PROMPT}${EXAMPLE_AVOIDANCES}`
	}
}
