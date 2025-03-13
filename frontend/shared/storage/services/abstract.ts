import type { Card, Deck } from '../lib/types'

export abstract class AbstractStorageService {
	abstract init(): Promise<void>
	abstract clearDatabase(): Promise<void>

	abstract getCard(id: string): Promise<Card | null>
	abstract getCards(): Promise<Card[]>
	abstract getDueCards(deckId?: string, date?: Date): Promise<Card[]>
	abstract createCard(card: Card): Promise<void>
	abstract updateCard(card: Card): Promise<void>

	abstract getDeck(id: string): Promise<Deck | null>
	abstract getDecks(): Promise<Deck[]>
	abstract createDeck(deck: Deck): Promise<void>
	abstract updateDeck(deck: Deck): Promise<void>

	abstract getCardsForDeck(deckId: string): Promise<Card[]>
	abstract clearDeckCards(deckId: string): Promise<void>
}
