export interface GeminiRequestBody {
	contents: Content[]
	safetySettings?: SafetySetting[]
	generationConfig?: GenerationConfig
}

export interface GenerationConfig {
	stopSequences?: string[]
	temperature?: number
	maxOutputTokens?: number
	topP?: number
	topK?: number
}

export interface SafetySetting {
	category?: string
	threshold?: string
}

export interface GeminiResponse {
	candidates: Candidate[]
	usageMetadata: UsageMetadata
	modelVersion: string
}

export interface Candidate {
	content: Content
	finishReason: string
	avgLogprobs: number
}

export interface Content {
	parts: Part[]
	role?: 'user' | 'model'
}

export interface Part {
	text: string
}

export interface UsageMetadata {
	promptTokenCount: number
	candidatesTokenCount: number
	totalTokenCount: number
}

export interface ModelCollection {
	models: Model[]
}

export interface Model {
	name: string
	version: string
	displayName: string
	description: string
	inputTokenLimit: number
	outputTokenLimit: number
	supportedGenerationMethods: SupportedGenerationMethod[]
	temperature?: number
	topP?: number
	topK?: number
	maxTemperature?: number
}

export enum SupportedGenerationMethod {
	CountTokens = 'countTokens',
	CreateCachedContent = 'createCachedContent',
	CreateTunedModel = 'createTunedModel',
	EmbedContent = 'embedContent',
	GenerateContent = 'generateContent',
}
