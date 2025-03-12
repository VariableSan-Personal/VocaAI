import { db } from '../lib'
import type { Card, Deck } from '../lib/types'
import type { AbstractStorageService } from './abstract'

export class IndexedDBStorage implements AbstractStorageService {
	async init(): Promise<void> {
		await db.open()
	}

	async clearDatabase(): Promise<void> {
		await db.delete()

		await db.open()
	}

	async getCard(id: string): Promise<Card | null> {
		return (await db.cards.get(id)) || null
	}

	async getCards(): Promise<Card[]> {
		return await db.cards.toArray()
	}

	async createCard(card: Card): Promise<void> {
		await db.cards.add({
			...card,
			modified: Date.now(),
			created: Date.now(),
		})
	}

	async updateCard(card: Card): Promise<void> {
		await db.cards.put({
			...card,
			modified: Date.now(),
		})
	}

	async getDeck(id: string): Promise<Deck | null> {
		return (await db.decks.get(id)) || null
	}

	async getDecks(): Promise<Deck[]> {
		const decks = await db.decks.toArray()
		return decks.filter((deck) => !deck.deleted)
	}

	async createDeck(deck: Deck): Promise<void> {
		await db.decks.add({
			...deck,
			created: Date.now(),
			modified: Date.now(),
		})
	}

	async updateDeck(deck: Deck): Promise<void> {
		await db.decks.put({
			...deck,
			modified: Date.now(),
		})
	}

	async getCardsForDeck(deckId: string): Promise<Card[]> {
		const cards = await db.cards.where('deckId').equals(deckId).toArray()
		return cards.filter((card) => !card.deleted)
	}

	async clearDeckCards(deckId: string): Promise<void> {
		await db.cards.where('deckId').equals(deckId).delete()
	}
}
