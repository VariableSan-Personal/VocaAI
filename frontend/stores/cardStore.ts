import { defineStore } from 'pinia'
import type { Grade } from 'ts-fsrs'
import { createEmptyCard, FSRS, generatorParameters } from 'ts-fsrs'
import { FSRS_PARAMETERS, StorageError, type Card, type Deck } from '~/shared'
import { IndexedDBStorage } from '~/shared/storage/services/indexeddb'

export const useCardStore = defineStore('cards', () => {
	const storage = new IndexedDBStorage()
	const fsrs = new FSRS(generatorParameters(FSRS_PARAMETERS))

	const cards = ref<Card[]>([])
	const decks = ref<Deck[]>([])
	const currentDeckId = ref<string | null>(null)
	const loading = ref(false)

	async function loadDecks() {
		decks.value = await storage.getDecks()
	}

	async function loadCardsForDeck(deckId: string) {
		currentDeckId.value = deckId
		cards.value = await storage.getCardsForDeck(deckId)
	}

	async function addDeck(name: string, icon: string) {
		const deck = await storage.addDeck(name, icon)
		decks.value.push(deck)
	}

	async function addCard(front: string, back: string) {
		if (!currentDeckId.value) {
			throw new StorageError('No deck selected')
		}

		const date = new Date()
		const card: Card = {
			...createEmptyCard(),
			id: crypto.randomUUID(),
			deckId: currentDeckId.value,
			front,
			back,
			created: date.getTime(),
			modified: date.getTime(),
		}

		await storage.saveCard(card)
		cards.value.push(card)
	}

	async function reviewCard(cardId: string, grade: Grade) {
		// TODO: optimize this
		const card = cards.value.find((c) => c.id === cardId)
		if (!card) return

		const dateNow = Date.now()
		const newState = fsrs.next(card, dateNow, grade)
		const updatedCard: Card = {
			...card,
			...newState.card,
			modified: dateNow,
		}

		await storage.saveCard(updatedCard)
		Object.assign(card, updatedCard)
	}

	async function clearDatabase() {
		try {
			await storage.clearDatabase()
			cards.value = []
		} catch (e) {
			console.error(e)
		}
	}

	async function init() {
		loading.value = true
		try {
			await storage.init()
			await loadDecks()
		} catch (e) {
			console.error(e)
		} finally {
			loading.value = false
		}
	}

	onMounted(() => {
		init()
	})

	return {
		cards,
		decks,
		currentDeckId,
		loading,
		loadDecks,
		loadCardsForDeck,
		addDeck,
		addCard,
		reviewCard,
		clearDatabase,
	}
})
