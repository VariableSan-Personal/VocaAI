<script lang="ts" setup>
	import { StorageError, type CustomPageMeta } from '~/shared'

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
	} satisfies CustomPageMeta)

	const logger = useCustomLogger('vocabulary-deckId')
	const route = useRoute()
	const router = useRouter()
	const cardStore = useCardStore()
	const { showError } = useGlobalStore()

	const categoryActions = [
		{
			icon: 'uil:process',
			title: 'Reset progress',
			onClick: () => {},
		},
		{
			icon: 'uil:pen',
			title: 'Edit this category',
			onClick: () => {},
		},
		{
			icon: 'uil:times',
			title: 'Clear this category',
			onClick: () => {},
		},
		{
			icon: 'uil:trash',
			title: 'Remove this category',
			onClick: () => {},
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

	const wordList = [
		{
			status: 'New',
			source: 'addendum',
			target: 'добавление, дополнение',
		},
		{
			status: 'New',
			source: 'ado',
			target: 'суматоха',
		},
		{
			status: 'New',
			source: 'adversary',
			target: 'противник',
		},
	]

	const loadCards = async () => {
		try {
			await cardStore.loadCardsForDeck(route.params.deckId as string)
		} catch (error) {
			if (error instanceof StorageError) {
				showError(error.message)
			}
			logger.error(error)
			router.push({ name: 'vocabulary' })
		}
	}

	watch(
		() => [cardStore.initialized],
		() => {
			if (cardStore.initialized) {
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
			<Teleport to="#headerTitle">
				{{ cardStore.currentDeck?.name }}
			</Teleport>
		</ClientOnly>

		<div class="container space-y-6">
			<section>
				<ul class="menu w-full gap-2 rounded-box">
					<template v-for="(category, index) in categoryActions" :key="index">
						<hr v-if="category.type === 'separator'" class="my-2" />

						<li v-else>
							<button class="grid gap-4">
								<Icon :name="category.icon!" size="20" class="col-span-1" />
								<span class="col-span-9">{{ category.title }}</span>
							</button>
						</li>
					</template>
				</ul>
			</section>

			<section>
				<div class="mx-4 mb-2 flex items-center justify-between">
					<h2 class="text-base text-secondary">Words</h2>

					<Button disabled variant="link" class="flex items-center gap-2 text-primary no-underline">
						<span class="text-base">By status</span>
						<Icon name="uil:sort" />
					</Button>
				</div>

				<ul class="menu space-y-2 rounded-xl bg-neutral">
					<li v-for="(word, index) in wordList" :key="index">
						<div class="relative flex flex-col items-start gap-y-0 py-2">
							<div class="absolute left-0 top-[10%] h-4/5 w-1 bg-secondary"></div>
							<p class="text-sm text-secondary">
								{{ word.status }}
							</p>
							<h6 class="text-base">
								{{ word.source }}
							</h6>
							<p>
								{{ word.target }}
							</p>

							<!-- TODO: Add a button to play audio pronunciation of the word -->
						</div>
					</li>
				</ul>
			</section>
		</div>

		<Button variant="primary" class="fixed bottom-6 right-1/2 !translate-x-1/2 rounded-xl" disabled>
			<Icon name="uil:plus" />
			Word
		</Button>
	</div>
</template>
