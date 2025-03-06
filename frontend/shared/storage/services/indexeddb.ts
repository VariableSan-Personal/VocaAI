import { openDB, type IDBPDatabase } from 'idb'
import type { Card, Deck } from '../lib/types'
import type { AbstractStorageService } from './abstract'

export class IndexedDBStorage implements AbstractStorageService {
	private db: IDBPDatabase | null = null
	private DB_NAME = 'flashcards'
	private CARDS_STORE = 'cards'
	private DECKS_STORE = 'decks'

	async init(): Promise<void> {
		this.db = await openDB(this.DB_NAME, 1, {
			upgrade(db) {
				const cardsStore = db.createObjectStore('cards', { keyPath: 'id' })
				cardsStore.createIndex('due', 'due')
				cardsStore.createIndex('modified', 'modified')
				cardsStore.createIndex('deckId', 'deckId')

				const decksStore = db.createObjectStore('decks', { keyPath: 'id' })
				decksStore.createIndex('modified', 'modified')
			},
		})
	}

	async clearDatabase(): Promise<void> {
		this.db?.close()
		indexedDB.deleteDatabase(this.DB_NAME)
	}

	async getCard(id: string): Promise<Card | null> {
		return this.db?.get(this.CARDS_STORE, id) || null
	}

	async getCards(): Promise<Card[]> {
		return this.db?.getAll(this.CARDS_STORE) || []
	}

	async saveCard(card: Card): Promise<void> {
		await this.db?.put(this.CARDS_STORE, {
			...card,
			modified: Date.now(),
		})
	}

	async getDeck(id: string): Promise<Deck | null> {
		return this.db?.get(this.DECKS_STORE, id) || null
	}

	async getDecks(): Promise<Deck[]> {
		const decks = (await this.db?.getAll(this.DECKS_STORE)) || []
		return decks.filter((deck) => !deck.deleted)
	}

	async saveDeck(deck: Deck): Promise<void> {
		await this.db?.put(this.DECKS_STORE, {
			...deck,
			modified: Date.now(),
		})
	}

	async getCardsForDeck(deckId: string): Promise<Card[]> {
		const tx = this.db?.transaction(this.CARDS_STORE, 'readonly')
		const index = tx?.store.index('deckId')
		const cards: Card[] = (await index?.getAll(deckId)) || []
		return cards.filter((card) => !card.deleted)
	}

	async clearDeckCards(deckId: string): Promise<void> {
		const cards = await this.getCardsForDeck(deckId)

		if (!cards.length) return

		const tx = this.db?.transaction(this.CARDS_STORE, 'readwrite')
		const store = tx?.store

		if (!store) return

		for (const card of cards) {
			await store.delete(card.id)
		}

		await tx?.done
	}
}
