import Dexie, { type Table } from 'dexie'
import type { Card, Deck } from './types'

export class FlashcardsDatabase extends Dexie {
	cards!: Table<Card, string>
	decks!: Table<Deck, string>

	constructor() {
		super('flashcards')
		this.version(1).stores({
			cards: 'id, due, modified, deckId',
			decks: 'id, modified',
		})
	}
}

export const db = new FlashcardsDatabase()
