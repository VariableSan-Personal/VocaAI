export enum AIServiceType {
	ChatGPT = 'chatgpt',
	Claude = 'claude',
	Gemini = 'gemini',
}

export const DEFAULT_TEMPERATURE = 0.7
export const DEFAULT_MAX_TOKENS = 2048

export const SERVICE_NAMES = {
	[AIServiceType.ChatGPT]: 'ChatGPT',
	[AIServiceType.Claude]: 'Claude',
	[AIServiceType.Gemini]: 'Gemini',
}
