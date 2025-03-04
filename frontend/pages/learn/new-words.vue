<script setup lang="ts">
	import { Rating, type Grade } from 'ts-fsrs'
	import { z } from 'zod'
	import type { CustomPageMeta } from '~/shared'

	type Schema = z.output<typeof schema>

	definePageMeta({
		showBack: true,
		title: 'Learn new words',
		hideBottomNav: true,
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

	const clearDatabase = () => {
		cardStore.clearDatabase()
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
			<Button variant="error" @click="clearDatabase">Clear Database</Button>

			<form @submit.prevent="handleAddCard">
				<div class="mb-4 space-y-4">
					<TextField v-model="form.front" :error="errors.front" placeholder="Front side" />
					<TextField v-model="form.back" :error="errors.back" placeholder="Back side" />
				</div>

				<Button type="submit">Add Card</Button>
			</form>

			<hr />

			<div class="space-y-4">
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
			</div>
		</section>
	</div>
</template>
