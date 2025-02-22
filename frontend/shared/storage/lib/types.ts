import type { Card as FSRSCard } from 'ts-fsrs'

export interface Card extends FSRSCard {
	id: string
	deckId: string
	front: string
	back: string
	created: number
	modified: number
	syncId?: string
	deleted?: boolean
}

export interface SyncMetadata {
	lastSynced: number
	deviceId: string
}

export interface Deck {
	id: string
	name: string
	created: number
	modified: number
	deleted?: boolean
	icon: string
	cardCount: number
}
