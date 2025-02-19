<script lang="ts" setup>
	import type { CustomPageMeta } from '~/shared'

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
	} satisfies CustomPageMeta)

	const route = useRoute()
	const router = useRouter()

	const cardStore = useCardStore()

	const initDeck = async () => {
		if (route.params.deckId) {
			await cardStore.loadCardsForDeck(route.params.deckId as string)
		} else {
			router.push({ name: 'vocabulary' })
		}
	}

	onMounted(() => {
		initDeck()
	})
</script>

<template>
	<div class="container">
		<section>
			<!-- Category Actions Card -->
			<div class="mx-4 mb-6 overflow-hidden rounded-lg bg-gray-800">
				<div class="border-b border-gray-700">
					<button class="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-700">
						<i class="i-uil-history text-2xl text-blue-400"></i>
						<span class="text-xl">Reset progress</span>
					</button>
				</div>

				<div class="border-b border-gray-700">
					<button class="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-700">
						<i class="i-uil-edit text-2xl text-blue-400"></i>
						<span class="text-xl">Edit this category</span>
					</button>
				</div>

				<div class="border-b border-gray-700">
					<button class="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-700">
						<i class="i-uil-times text-2xl text-blue-400"></i>
						<span class="text-xl">Clear this category</span>
					</button>
				</div>

				<div>
					<button class="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-700">
						<i class="i-uil-trash text-2xl text-blue-400"></i>
						<span class="text-xl">Remove this category</span>
					</button>
				</div>
			</div>

			<!-- Secondary Actions Card -->
			<div class="mx-4 mb-6 overflow-hidden rounded-lg bg-gray-800">
				<div class="border-b border-gray-700">
					<button class="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-700">
						<i class="i-uil-file-plus-alt text-2xl text-blue-400"></i>
						<span class="text-xl">Import words</span>
					</button>
				</div>

				<div>
					<button class="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-700">
						<i class="i-uil-share-alt text-2xl text-blue-400"></i>
						<span class="text-xl">Share category</span>
					</button>
				</div>
			</div>

			<!-- Words Section -->
			<div class="mx-4 mb-2 flex items-center justify-between">
				<h2 class="text-2xl text-gray-400">Words</h2>
				<div class="flex items-center gap-2">
					<span class="text-xl text-blue-400">By status</span>
					<div class="flex flex-col">
						<i class="i-uil-sort-amount-up text-xl text-blue-400"></i>
						<i class="i-uil-sort-amount-down -mt-1 text-xl text-blue-400"></i>
					</div>
				</div>
			</div>

			<!-- Word List -->
			<div class="mx-4 flex-1">
				<div class="mb-1 overflow-hidden rounded-lg bg-gray-800">
					<div class="border-l-4 border-gray-600 p-4">
						<div class="text-gray-400">New</div>
						<div class="text-2xl font-bold">addendum</div>
						<div class="text-gray-300">добавление, дополнение</div>
						<div class="flex justify-end">
							<button class="btn btn-circle btn-ghost">
								<i class="i-uil-play text-2xl text-gray-500"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="mb-1 overflow-hidden rounded-lg bg-gray-800">
					<div class="border-l-4 border-gray-600 p-4">
						<div class="text-gray-400">New</div>
						<div class="text-2xl font-bold">ado</div>
						<div class="text-gray-300">суматоха</div>
						<div class="flex justify-end">
							<button class="btn btn-circle btn-ghost">
								<i class="i-uil-play text-2xl text-gray-500"></i>
							</button>
						</div>
					</div>
				</div>

				<div class="mb-1 overflow-hidden rounded-lg bg-gray-800">
					<div class="border-l-4 border-gray-600 p-4">
						<div class="text-gray-400">New</div>
						<div class="text-2xl font-bold">adversary</div>
						<div class="text-gray-300">противник, искуситель, враг</div>
						<div class="flex justify-end">
							<button class="btn btn-circle btn-ghost">
								<i class="i-uil-play text-2xl text-gray-500"></i>
							</button>
						</div>
					</div>
				</div>
			</div>

			<Button variant="primary" class="fixed bottom-6 right-1/2 !translate-x-1/2 rounded-xl">
				<Icon name="uil:plus" />
				Word
			</Button>
		</section>
	</div>
</template>
