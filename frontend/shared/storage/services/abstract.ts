import type { Card, Deck } from '../lib/types'

// TODO: remove unnecessary methods
export interface StorageService {
	clearDatabase(): Promise<void>

	getCard(id: string): Promise<Card | null>
	getCards(): Promise<Card[]>
	saveCard(card: Card): Promise<void>
	deleteCard(id: string): Promise<void>
	getDueCards(limit?: number): Promise<Card[]>
	getModifiedSince(timestamp: number): Promise<Card[]>

	getDeck(id: string): Promise<Deck | null>
	getDecks(): Promise<Deck[]>
	saveDeck(deck: Deck): Promise<void>
	deleteDeck(id: string): Promise<void>
	getCardsForDeck(deckId: string): Promise<Card[]>
	getDueCardsForDeck(deckId: string, limit?: number): Promise<Card[]>
}
