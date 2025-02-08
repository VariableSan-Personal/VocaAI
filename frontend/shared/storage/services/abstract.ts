import type { Card } from '../lib/types'

export interface StorageService {
	getCard(id: string): Promise<Card | null>
	getCards(): Promise<Card[]>
	saveCard(card: Card): Promise<void>
	deleteCard(id: string): Promise<void>
	getDueCards(limit?: number): Promise<Card[]>
	getModifiedSince(timestamp: number): Promise<Card[]>
}
