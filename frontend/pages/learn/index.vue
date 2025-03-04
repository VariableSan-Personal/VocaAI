<script setup lang="ts">
	import type { CustomPageMeta } from '~/shared'

	definePageMeta({
		title: 'Spaced repetition',
	} satisfies CustomPageMeta)

	const cardStore = useCardStore()
</script>

<template>
	<div class="container space-y-4">
		<section>
			<h2 class="text-secondary">Review and Learn</h2>

			<ul class="menu space-y-2">
				<li v-for="(item, index) in cardStore.decks" :key="index">
					<NuxtLink class="grid gap-4" :to="{ name: 'learn-deckId', params: { deckId: item.id } }">
						<Icon :name="item.icon" class="col-span-1" />
						<div class="col-span-9 flex flex-col">
							<span>{{ item.name }}</span>
						</div>
					</NuxtLink>
				</li>
			</ul>
		</section>
	</div>
</template>
