import { openDB, type IDBPDatabase } from 'idb'
import type { Card } from '../lib/types'
import type { StorageService } from './abstract'

export class IndexedDBStorage implements StorageService {
	private db: IDBPDatabase | null = null
	private DB_NAME = 'flashcards'
	private CARDS_STORE = 'cards'

	async init() {
		this.db = await openDB(this.DB_NAME, 1, {
			upgrade(db) {
				const store = db.createObjectStore('cards', { keyPath: 'id' })
				store.createIndex('due', 'due')
				store.createIndex('modified', 'modified')
			},
		})
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

	async deleteCard(id: string): Promise<void> {
		await this.db?.delete(this.CARDS_STORE, id)
	}

	async clearDatabase(): Promise<void> {
		const tx = this.db?.transaction(this.CARDS_STORE, 'readwrite')
		await tx?.store.clear()
		await tx?.done
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
}
