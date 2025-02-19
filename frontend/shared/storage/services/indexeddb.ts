import { openDB, type IDBPDatabase } from 'idb'
import type { Card, Deck } from '../lib/types'
import type { StorageService } from './abstract'

export class IndexedDBStorage implements StorageService {
	private db: IDBPDatabase | null = null
	private DB_NAME = 'flashcards'
	private CARDS_STORE = 'cards'
	private DECKS_STORE = 'decks'

	async init() {
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

	async deleteDeck(id: string): Promise<void> {
		await this.db?.delete(this.DECKS_STORE, id)
	}

	async getCardsForDeck(deckId: string): Promise<Card[]> {
		const tx = this.db?.transaction(this.CARDS_STORE, 'readonly')
		const index = tx?.store.index('deckId')
		const cards = (await index?.getAll(deckId)) || []
		return cards.filter((card) => !card.deleted)
	}

	async getDueCardsForDeck(deckId: string, limit = 50): Promise<Card[]> {
		const tx = this.db?.transaction(this.CARDS_STORE, 'readonly')
		const now = Date.now()

		const cards = await this.getCardsForDeck(deckId)
		return cards.filter((card) => card.due.getTime() <= now).slice(0, limit)
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
		await this.updateDeckCardCount(card.deckId)
	}

	async deleteCard(id: string): Promise<void> {
		const card = await this.getCard(id)
		if (!card) return

		await this.db?.delete(this.CARDS_STORE, id)
		await this.updateDeckCardCount(card.deckId)
	}

	async clearDatabase(): Promise<void> {
		this.db?.close()
		indexedDB.deleteDatabase(this.DB_NAME)
	}

	async getDueCards(limit = 50): Promise<Card[]> {
		const tx = this.db?.transaction(this.CARDS_STORE, 'readonly')
		const index = tx?.store.index('due')
		const now = Date.now()

		const cards = (await index?.getAll(IDBKeyRange.upperBound(now), limit)) || []
		return cards.filter((card) => !card.deleted)
	}

	async getModifiedSince(timestamp: number): Promise<Card[]> {
		const tx = this.db?.transaction(this.CARDS_STORE, 'readonly')
		const index = tx?.store.index('modified')

		return index?.getAll(IDBKeyRange.lowerBound(timestamp)) || []
	}

	async updateDeckCardCount(deckId: string): Promise<void> {
		const deck = await this.getDeck(deckId)
		if (!deck) return

		const cards = await this.getCardsForDeck(deckId)
		const activeCards = cards.filter((card) => !card.deleted).length

		await this.saveDeck({
			...deck,
			cardCount: activeCards,
		})
	}

	async addDeck(name: string, icon: string): Promise<Deck> {
		const deck: Deck = {
			id: crypto.randomUUID(),
			name,
			icon,
			created: Date.now(),
			modified: Date.now(),
			cardCount: 0,
		}

		await this.saveDeck(deck)
		return deck
	}
}
