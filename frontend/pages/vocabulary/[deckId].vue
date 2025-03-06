<script lang="ts" setup>
	import { StorageError, type CustomPageMeta } from '~/shared'

	type ActionType = 'reset' | 'clear' | 'remove'

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
	} satisfies CustomPageMeta)

	const logger = useCustomLogger('vocabulary-deckId')
	const route = useRoute()
	const router = useRouter()
	const cardStore = useCardStore()
	const { showError } = useGlobalStore()

	const modal = reactive({
		visibility: false,
		mode: 'edit' as ActionType,
		title: 'Confirmation',
		subtitle: '',
	})

	const actionMenuItems = [
		{
			icon: 'uil:process',
			title: 'Reset progress',
			onClick: () => showModal('reset'),
		},
		{
			icon: 'uil:pen',
			title: 'Edit this category',
			onClick: () => {},
		},
		{
			icon: 'uil:times',
			title: 'Clear this category',
			onClick: () => showModal('clear'),
		},
		{
			icon: 'uil:trash',
			title: 'Remove this category',
			onClick: () => showModal('remove'),
		},
		{
			type: 'separator',
		},
		{
			icon: 'uil:file-medical',
			title: 'Import words',
			onClick: () => {},
		},
		{
			icon: 'uil:share-alt',
			title: 'Share category',
			onClick: () => {},
		},
	]

	const deckId = computed(() => route.params.deckId as string)

	const loadCards = async () => {
		try {
			await cardStore.loadCardsForDeck(deckId.value)
		} catch (error) {
			if (error instanceof StorageError) {
				showError(error.message)
			}
			logger.error(error)
			router.push({ name: 'vocabulary' })
		}
	}

	const closeModal = () => {
		modal.subtitle = ''
		modal.visibility = false
	}

	const clearDeckCards = async () => {
		await cardStore.clearDeckCards(deckId.value)
		loadCards()
	}

	const onConfirm = () => {
		switch (modal.mode) {
			case 'clear':
				clearDeckCards()
				break
		}

		logger.info(`Confirmed, mode: ${modal.mode}`)
		closeModal()
	}

	function showModal(actionType: ActionType) {
		let subtitle = ''

		switch (actionType) {
			case 'clear':
				subtitle =
					'Are you sure you want to clear this category? All words and progress will be reset.'
				break
			case 'reset':
				subtitle = 'Do you really want to reset your progress for this category?'
				break
			case 'remove':
				subtitle =
					'Are you sure you want to remove this category permanently? This action cannot be undone.'
				break
		}

		modal.subtitle = subtitle
		modal.mode = actionType
		modal.visibility = true
	}

	const addWord = () => {
		router.push({
			name: 'vocabulary-add-word',
			query: {
				deckId: deckId.value,
			},
		})
	}

	watch(
		() => cardStore.initialized,
		(val) => {
			if (val) {
				loadCards()
			}
		},
		{
			immediate: true,
		}
	)
</script>

<template>
	<div>
		<ClientOnly>
			<Teleport :key="deckId" to="#header-custom-title">
				{{ cardStore.currentDeck?.name }}
			</Teleport>
		</ClientOnly>

		<div class="container space-y-6">
			<section>
				<ul class="menu w-full gap-2 rounded-box">
					<template v-for="(item, index) in actionMenuItems" :key="index">
						<hr v-if="item.type === 'separator'" class="my-2" />

						<li v-else>
							<Button variant="ghost" class="flex justify-start" @click="item.onClick">
								<Icon :name="item.icon!" size="20" />
								<span>{{ item.title }}</span>
							</Button>
						</li>
					</template>
				</ul>
			</section>

			<section>
				<div class="mx-4 mb-2 flex items-center justify-between">
					<h2 class="text-base text-secondary">Words: {{ cardStore.cards.length }}</h2>

					<Button disabled variant="link" class="flex items-center gap-2 text-primary no-underline">
						<span class="text-base">By status</span>
						<Icon name="uil:sort" />
					</Button>
				</div>

				<ul v-if="cardStore.cards.length" class="menu space-y-2 rounded-xl bg-neutral">
					<!-- TODO: when clicking on a word, it must be forwarded for editing. -->
					<li v-for="(word, index) in cardStore.cards" :key="index">
						<div class="relative flex flex-col items-start gap-y-0 py-2">
							<div class="absolute left-0 top-[10%] h-4/5 w-1 bg-secondary"></div>
							<p class="text-sm text-secondary">State: {{ word.state }}</p>
							<h6 class="text-base">
								{{ word.word }}
							</h6>
							<p>
								{{ word.translation }}
							</p>

							<!-- TODO: Add a button to play audio pronunciation of the word -->
						</div>
					</li>
				</ul>
			</section>
		</div>

		<Button
			variant="primary"
			class="fixed bottom-6 right-1/2 !translate-x-1/2 rounded-xl"
			@click="addWord"
		>
			<Icon name="uil:plus" />
			Word
		</Button>

		<ConfirmationModal v-model="modal.visibility" v-bind="modal" @confirm="onConfirm" />
	</div>
</template>
