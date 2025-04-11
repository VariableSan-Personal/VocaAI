<script lang="ts" setup>
	import { Rating, type Grade } from 'ts-fsrs'
	import type { CustomPageMeta } from '~/shared'

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
		title: 'Session',
	} satisfies CustomPageMeta)

	const route = useRoute()
	const cardStore = useCardStore()
	const logger = useCustomLogger('learn-deckId-session')

	const showAnswer = ref(false)
	const currentCardIndex = ref(0)
	const isSessionComplete = ref(false)

	const deckId = computed(() => route.params.deckId as string)

	const currentCard = computed(() => {
		if (cardStore.cards.length === 0) return null
		return cardStore.cards[currentCardIndex.value]
	})

	const handleReview = async (grade: Grade) => {
		if (!currentCard.value?.id) {
			return
		}

		try {
			await cardStore.reviewCard(currentCard.value.id, grade)
		} catch (error) {
			logger.error(error)
		}

		if (currentCardIndex.value < cardStore.cards.length - 1) {
			currentCardIndex.value++
		} else {
			isSessionComplete.value = true
		}

		showAnswer.value = false
	}

	const revealAnswer = () => {
		showAnswer.value = true
	}

	watch(
		() => cardStore.initialized,
		async (val) => {
			if (val) {
				try {
					await cardStore.loadDueCardsForDeck(deckId.value)
				} catch (error) {
					logger.error(error)
				}
			}
		},
		{ immediate: true }
	)
</script>

<template>
	<div class="container mx-auto max-w-2xl py-8">
		<section class="space-y-6">
			<div v-if="cardStore.cards.length > 0" class="text-center">
				<p class="text-sm opacity-70">
					Card {{ currentCardIndex + 1 }} of {{ cardStore.cards.length }}
				</p>
				<progress
					class="progress w-full"
					:value="currentCardIndex"
					:max="cardStore.cards.length - 1"
				></progress>
			</div>

			<div
				v-if="cardStore.cards.length === 0 || isSessionComplete"
				class="card bg-base-200 shadow-xl"
			>
				<div class="card-body items-center text-center">
					<h2 class="text-2xl font-bold">Session Complete!</h2>
					<p class="mb-4">You've reviewed all cards due for today.</p>
					<NuxtLink :to="{ name: 'learn-deckId', params: { deckId } }" class="btn btn-primary">
						Back to Decks
					</NuxtLink>
				</div>
			</div>

			<div v-else-if="currentCard" class="card min-h-60 bg-base-100 shadow-xl">
				<div class="card-body items-center space-y-4 text-center">
					<h2 class="card-title text-3xl">
						{{ currentCard.word }}
					</h2>

					<div v-if="showAnswer" class="space-y-8">
						<div class="space-y-4">
							<p class="text-xl">{{ currentCard.translation }}</p>

							<div v-if="currentCard.examples?.length > 0">
								<h3 class="mb-2 text-lg font-medium">Examples:</h3>

								<ul class="list-inside space-y-4 divide-y text-left">
									<li v-for="(example, index) in currentCard.examples" :key="index">
										<div class="text-sm">
											<p>- {{ example.text }}</p>
											<p>- {{ example.translation }}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>

						<div class="flex flex-wrap justify-center gap-2">
							<Button class="btn-error" @click="handleReview(Rating.Again)">Again</Button>
							<Button class="btn-warning" @click="handleReview(Rating.Hard)">Hard</Button>
							<Button class="btn-success" @click="handleReview(Rating.Good)">Good</Button>
							<Button class="btn-info" @click="handleReview(Rating.Easy)">Easy</Button>
						</div>
					</div>

					<div v-else>
						<Button class="btn-primary" @click="revealAnswer">Show Answer</Button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
