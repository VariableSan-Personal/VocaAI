import { defineStore } from 'pinia'
import type { Grade } from 'ts-fsrs'
import { createEmptyCard, FSRS, generatorParameters } from 'ts-fsrs'
import {
	FSRS_PARAMETERS,
	LocalStorageKeys,
	StorageError,
	StorageServiceFactory,
	StorageServiceType,
	type BaseCard,
	type Card,
	type Deck,
} from '~/shared'

const DEFAULT_STORAGE = StorageServiceType.IndexedDB

export const useCardStore = defineStore('cards', () => {
	const logger = useCustomLogger('useCardStore')

	const storageFactoryInstance = StorageServiceFactory.getInstance()
	const fsrs = new FSRS(generatorParameters(FSRS_PARAMETERS))
	const currentServiceType = ref<StorageServiceType>()
	let storage = storageFactoryInstance.createService(StorageServiceType.IndexedDB)

	const loading = ref(false)
	const initialized = ref(false)

	const cards = ref<Card[]>([])
	const decks = ref<Deck[]>([])
	const currentDeck = ref<Deck | null>(null)

	const loadDecks = async () => {
		const res = await storage.getDecks()
		decks.value = res
	}

	const getCurrentService = () => {
		return storageFactoryInstance.getCurrentService()
	}

	/**
	 * Loads cards for a specific deck and sets it as the current deck.
	 * @throws {StorageError} When no deck exists with the provided ID
	 */
	const loadCardsForDeck = async (deckId: string) => {
		const deck = await getDeck(deckId)

		currentDeck.value = deck
		cards.value = await storage.getCardsForDeck(deck.id)
	}

	/**
	 * Gets information about a specific deck by its ID
	 * @throws {StorageError} When no deck exists with the provided ID
	 */
	const getDeck = async (deckId: string) => {
		const deck = await storage.getDeck(deckId)

		if (!deck) {
			throw new StorageError('There is no deck with this ID')
		}

		return deck
	}

	const addDeck = async (name: string, icon: string) => {
		const date = new Date()
		const deck: Deck = {
			id: crypto.randomUUID(),
			name,
			icon,
			created: date.getTime(),
			modified: date.getTime(),
		}

		await storage.saveDeck(deck)
		decks.value.push(deck)
	}

	const addCard = async (newCard: BaseCard, deckId: string) => {
		const date = new Date()
		const card: Card = {
			...createEmptyCard(),
			...newCard,
			id: crypto.randomUUID(),
			deckId,
			created: date.getTime(),
			modified: date.getTime(),
		}

		await storage.saveCard(card)
		cards.value.push(card)
	}

	const reviewCard = async (cardId: string, grade: Grade) => {
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

	const clearDatabase = async () => {
		try {
			await storage.clearDatabase()
			cards.value = []
		} catch (e) {
			logger.error(e)
		}
	}

	const setupStorageService = async (type: StorageServiceType) => {
		loading.value = true
		try {
			storage = storageFactoryInstance.createService(type)
			currentServiceType.value = type
			localStorage.setItem(LocalStorageKeys.SelectedStorageService, type)

			await storage.init()
			await loadDecks()
		} catch (error) {
			logger.error(error)
		} finally {
			loading.value = true
		}
	}

	const clearDeckCards = async (deckId: string) => {
		await storage.clearDeckCards(deckId)
	}

	const initializeCardStore = () => {
		initialized.value = true
	}

	const loadSavedStorageConfiguration = () => {
		let savedType = localStorage.getItem(
			LocalStorageKeys.SelectedStorageService
		) as StorageServiceType

		if (!savedType || !Object.values(StorageServiceType).includes(savedType)) {
			savedType = DEFAULT_STORAGE
		}

		try {
			setupStorageService(savedType)
			initializeCardStore()
		} catch {
			logger.error('Failed to load saved Storage configuration')
		}
	}

	onMounted(() => {
		loadSavedStorageConfiguration()
	})

	return {
		cards,
		decks,
		currentDeck,
		loading,
		initialized,
		loadDecks,
		loadCardsForDeck,
		addDeck,
		addCard,
		reviewCard,
		clearDatabase,
		getDeck,
		clearDeckCards,
		setupStorageService,
		getCurrentService,
	}
})
