import type { Card as FSRSCard } from 'ts-fsrs'

export interface BaseCard {
	word: string
	translation: string
	transcription?: string
	examples: Array<{ text: string; translation: string }>
}

export interface Card extends BaseCard, FSRSCard {
	id: string
	deckId: string
	created: number
	modified: number
}

export interface Deck {
	id: string
	name: string
	created: number
	modified: number
	icon: string
}
