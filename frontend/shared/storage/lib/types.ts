import type { Card as FSRSCard } from 'ts-fsrs'

export interface Card extends FSRSCard {
	id: string
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
