<script setup lang="ts">
	import { Rating, type Grade } from 'ts-fsrs'
	import type { CustomPageMeta } from '~/shared'

	definePageMeta({
		showBack: true,
		title: 'Learn new words',
	} satisfies CustomPageMeta)

	const cardStore = useCardStore()

	const front = ref('')
	const back = ref('')
	const dateNow = ref(Date.now())

	const dueCards = computed(() => cardStore.cards.filter((c) => c.due.getTime() <= dateNow.value))

	function forceRerender() {
		dateNow.value = Date.now()
	}

	async function handleAddCard() {
		await cardStore.addCard(front.value, back.value)
		front.value = ''
		back.value = ''
	}

	async function handleReview(cardId: string, grade: Grade) {
		await cardStore.reviewCard(cardId, grade)
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
			<form @submit.prevent="handleAddCard">
				<div class="mb-4 space-y-4">
					<input v-model="front" class="input input-bordered w-full" placeholder="Front side" />
					<input v-model="back" class="input input-bordered w-full" placeholder="Back side" />
				</div>

				<button class="btn" type="submit">Add Card</button>
			</form>

			<hr />

			<div class="space-y-4">
				<div v-for="card in dueCards" :key="card.id" class="card shadow-xl">
					<div class="card-body items-center text-center">
						<h2 class="card-title">
							{{ card.front }}
						</h2>

						<p>
							{{ card.back }}
						</p>

						<div class="flex gap-2">
							<button class="btn" @click="handleReview(card.id, Rating.Again)">Again</button>
							<button class="btn" @click="handleReview(card.id, Rating.Hard)">Hard</button>
							<button class="btn" @click="handleReview(card.id, Rating.Good)">Good</button>
							<button class="btn" @click="handleReview(card.id, Rating.Easy)">Easy</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
