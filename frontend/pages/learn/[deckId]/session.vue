<script lang="ts" setup>
	import { Rating, type Grade } from 'ts-fsrs'
	import { z } from 'zod'
	import type { CustomPageMeta } from '~/shared'

	type Schema = z.output<typeof schema>

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
		title: 'Session',
	} satisfies CustomPageMeta)

	const cardStore = useCardStore()
	const logger = useCustomLogger('learn-new-word')

	const schema = z.object({
		front: z.string().min(1, 'Word is required'),
		back: z.string().min(1, 'Word is required'),
	})

	const form = reactive<Schema>({
		front: '',
		back: '',
	})

	const errors = ref<Record<string, string>>({})
	const dateNow = ref(Date.now())

	const dueCards = computed(() => cardStore.cards.filter((c) => c.due.getTime() <= dateNow.value))

	const forceRerender = () => {
		dateNow.value = Date.now()
	}

	const handleAddCard = async () => {
		clearValidationErrors()

		try {
			const { front, back } = schema.parse(form)
			logger.info(front + ' ' + back)
		} catch (err) {
			if (err instanceof z.ZodError) {
				err.errors.forEach((error) => {
					const path = error.path.join('.')
					errors.value[path] = error.message
				})
			}
		}
	}

	const handleReview = async (cardId: string, grade: Grade) => {
		await cardStore.reviewCard(cardId, grade)
	}

	const clearValidationErrors = () => {
		errors.value = {}
	}

	onMounted(() => {
		const interval = setInterval(forceRerender, 30000)

		onUnmounted(() => {
			clearInterval(interval)
		})
	})
</script>

<template>
	<div class="container">
		<section class="space-y-4">
			<div v-for="card in dueCards" :key="card.id" class="card shadow-xl">
				<div class="card-body items-center text-center">
					<h2 class="card-title">
						{{ card.word }}
					</h2>

					<p>
						{{ card.translation }}
					</p>

					<div class="flex gap-2">
						<Button @click="handleReview(card.id, Rating.Again)">Again</Button>
						<Button @click="handleReview(card.id, Rating.Hard)">Hard</Button>
						<Button @click="handleReview(card.id, Rating.Good)">Good</Button>
						<Button @click="handleReview(card.id, Rating.Easy)">Easy</Button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
