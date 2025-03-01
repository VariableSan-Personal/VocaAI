<script setup lang="ts">
	definePageMeta({
		title: 'Vocabulary',
	})

	const cardStore = useCardStore()
</script>

<template>
	<div class="container">
		<div class="card m-2 shadow-lg">
			<ClientOnly>
				<Teleport to="#header-right-content">
					<Button
						variant="link"
						class="px-0 uppercase text-primary disabled:bg-transparent"
						disabled
					>
						Import
					</Button>
				</Teleport>
			</ClientOnly>

			<form class="form-control px-4">
				<TextField disabled icon-name="uil:search" placeholder="Search for words..." />
			</form>

			<ul class="menu space-y-2">
				<li>
					<NuxtLink class="grid gap-4" :to="{ name: 'vocabulary-new-deck' }">
						<Icon name="uil:plus" class="col-span-1" />
						<div class="col-span-9 flex flex-col">
							<span>Create new deck</span>
						</div>
					</NuxtLink>
				</li>

				<li v-for="(item, index) in cardStore.decks" :key="index">
					<NuxtLink
						class="grid gap-4"
						:to="{ name: 'vocabulary-deckId', params: { deckId: item.id } }"
					>
						<Icon :name="item.icon" class="col-span-1" />
						<div class="col-span-9 flex flex-col">
							<span>{{ item.name }}</span>
							<span v-if="item.cardCount">{{ item.cardCount }} words</span>
						</div>
					</NuxtLink>
				</li>
			</ul>
		</div>

		<Button
			variant="primary"
			class="fixed bottom-20 right-1/2 !translate-x-1/2"
			@click="$router.push({ name: 'vocabulary-add-word' })"
		>
			<Icon name="uil:plus" class="mr-1" />
			Word
		</Button>
	</div>
</template>
