<script lang="ts" setup>
	import { StorageError, type CustomPageMeta } from '~/shared'

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
	} satisfies CustomPageMeta)

	const route = useRoute()
	const router = useRouter()

	const logger = useCustomLogger('learn-deckId')

	const { showError } = useGlobalStore()
	const cardStore = useCardStore()

	const deckId = computed(() => route.params.deckId as string)

	const study = () => {
		router.push({ name: 'learn-deckId-session' })
	}

	const initializeDeck = async () => {
		try {
			// TODO: send repeated actions to composable
			await cardStore.loadCardsForDeck(deckId.value)
		} catch (error) {
			if (error instanceof StorageError) {
				showError(error.message)
			}
			logger.error(error)
		}
	}

	watch(
		() => cardStore.initialized,
		(val) => {
			if (val && deckId.value) {
				initializeDeck()
			}
		}
	)
</script>

<template>
	<div>
		<ClientOnly>
			<Teleport to="#header-custom-title">
				{{ cardStore.currentDeck?.name }}
			</Teleport>
		</ClientOnly>

		<div class="container">
			<section class="space-y-4">
				<div class="stats w-full bg-base-200 shadow">
					<div class="stat">
						<div class="stat-figure text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-8 w-8 stroke-current"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								></path>
							</svg>
						</div>
						<div class="stat-title">Total Cards</div>
						<div class="stat-value text-primary">25</div>
						<div class="stat-desc">Cards in this deck</div>
					</div>
					<div class="stat">
						<div class="stat-figure text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-8 w-8 stroke-current"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								></path>
							</svg>
						</div>
						<div class="stat-title">Mastered</div>
						<div class="stat-value text-secondary">12</div>
						<div class="stat-desc">48% of your cards</div>
					</div>
					<div class="stat">
						<div class="stat-figure text-accent">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-8 w-8 stroke-current"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
								></path>
							</svg>
						</div>
						<div class="stat-title">Learning Streak</div>
						<div class="stat-value text-accent">7 days</div>
						<div class="stat-desc">Keep it going!</div>
					</div>
				</div>
				<div class="flex justify-center">
					<Button variant="primary" @click="study">Study</Button>
				</div>
			</section>
		</div>
	</div>
</template>
