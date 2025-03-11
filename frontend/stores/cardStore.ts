import { defineStore } from 'pinia'
import type { Grade } from 'ts-fsrs'
import { createEmptyCard, FSRS, generatorParameters } from 'ts-fsrs'
import {
	FSRS_PARAMETERS,
	LocalStorageKeys,
	StorageError,
	StorageServiceFactory,
	StorageServiceType,
	type AbstractStorageService,
	type BaseCard,
	type Card,
	type Deck,
} from '~/shared'

const DEFAULT_STORAGE = StorageServiceType.IndexedDB

export const useCardStore = defineStore('cards', () => {
	const logger = useCustomLogger('useCardStore')

	const storageFactoryInstance = StorageServiceFactory.getInstance()
	const fsrs = new FSRS(generatorParameters(FSRS_PARAMETERS))
	let storage: AbstractStorageService | null = null

	const initialized = ref(false)
	const currentServiceType = ref<StorageServiceType | undefined>()
	const cards = ref<Card[]>([])
	const decks = ref<Deck[]>([])
	const currentDeck = ref<Deck | null>(null)

	const ensureStorageInitialized = () => {
		if (!storage) {
			throw new StorageError('Storage service not initialized')
		}
		return storage
	}

	const getCurrentService = () => {
		return storage
	}

	const setupStorageService = async (type: StorageServiceType) => {
		try {
			const newStorage = storageFactoryInstance.createService(type)
			await newStorage.init()

			storage = newStorage
			currentServiceType.value = type
			localStorage.setItem(LocalStorageKeys.SelectedStorageService, type)

			await loadDecks()
		} catch (error) {
			logger.error(`Failed to initialize storage service: ${error}`)
			throw new StorageError('Failed to initialize storage service')
		}
	}

	const loadDecks = async () => {
		const service = ensureStorageInitialized()
		decks.value = await service.getDecks()
	}

	const getDeck = async (deckId: string) => {
		const service = ensureStorageInitialized()
		const deck = await service.getDeck(deckId)

		if (!deck) {
			throw new StorageError('There is no deck with this ID')
		}

		return deck
	}

	const addDeck = async (name: string, icon: string) => {
		const service = ensureStorageInitialized()
		const date = new Date()

		const deck: Deck = {
			id: crypto.randomUUID(),
			name,
			icon,
			created: date.getTime(),
			modified: date.getTime(),
		}

		await service.saveDeck(deck)
		decks.value.push(deck)
		return deck
	}

	const loadCardsForDeck = async (deckId: string) => {
		const service = ensureStorageInitialized()
		const deck = await getDeck(deckId)

		currentDeck.value = deck
		cards.value = await service.getCardsForDeck(deck.id)
	}

	const addCard = async (newCard: BaseCard, deckId: string) => {
		const service = ensureStorageInitialized()
		const date = new Date()

		const card: Card = {
			...createEmptyCard(),
			...newCard,
			id: crypto.randomUUID(),
			deckId,
			created: date.getTime(),
			modified: date.getTime(),
		}

		await service.saveCard(card)
		cards.value.push(card)
		return card
	}

	const updateCard = async (updatedCard: Card) => {
		const service = ensureStorageInitialized()
		await service.saveCard(updatedCard)

		const index = cards.value.findIndex((c) => c.id === updatedCard.id)
		if (index !== -1) {
			cards.value[index] = updatedCard
		}
	}

	const reviewCard = async (cardId: string, grade: Grade) => {
		const service = ensureStorageInitialized()
		const cardIndex = cards.value.findIndex((c) => c.id === cardId)

		if (cardIndex === -1) return

		const card = cards.value[cardIndex]
		const dateNow = Date.now()
		const newState = fsrs.next(card, dateNow, grade)

		const updatedCard: Card = {
			...card,
			...newState.card,
			modified: dateNow,
		}

		await service.saveCard(updatedCard)
		cards.value[cardIndex] = updatedCard
	}

	const clearDatabase = async () => {
		const service = ensureStorageInitialized()
		try {
			await service.clearDatabase()
			cards.value = []
			decks.value = []
			currentDeck.value = null
		} catch (error) {
			logger.error(`Failed to clear database: ${error}`)
			throw new StorageError('Failed to clear database')
		}
	}

	const clearDeckCards = async (deckId: string) => {
		const service = ensureStorageInitialized()
		await service.clearDeckCards(deckId)

		if (currentDeck.value?.id === deckId) {
			cards.value = []
		}
	}

	const loadSavedStorageConfiguration = async () => {
		const userPreferredStorage = localStorage.getItem(
			LocalStorageKeys.SelectedStorageService
		) as StorageServiceType
		const savedType = userPreferredStorage || DEFAULT_STORAGE

		try {
			await setupStorageService(savedType)
		} catch (error) {
			logger.error(`Failed to load saved Storage configuration: ${error}`)
		}
	}

	onMounted(async () => {
		await loadSavedStorageConfiguration()
		initialized.value = true
	})

	return {
		cards,
		decks,
		currentDeck,
		initialized,
		currentServiceType,

		loadDecks,
		loadCardsForDeck,
		addDeck,
		addCard,
		updateCard,
		reviewCard,
		clearDatabase,
		getDeck,
		clearDeckCards,
		setupStorageService,
		getCurrentService,
	}
})
