<script setup lang="ts">
	definePageMeta({
		title: 'Vocabulary',
	})

	const generalList = ref(true)
	const oxfordList = ref(true)

	const categories = [
		{
			title: 'Add category',
			icon: 'uil:plus',
			disabled: false,
			onClick: () => {},
		},
		{ title: 'Idioms', words: 2, icon: 'uil:water', disabled: true },
		{ title: 'Linking words', words: 46, icon: 'uil:ruler', disabled: true, progress: 87 },
		{ title: 'Свои слова', words: 79, icon: 'uil:camera', disabled: true, progress: 5 },
	]
</script>

<template>
	<div class="container">
		<div class="card m-2 shadow-lg">
			<teleport to="#headerContent">
				<Button variant="link" class="px-0 uppercase text-primary disabled:bg-transparent" disabled>
					Import
				</Button>
			</teleport>

			<form class="form-control px-4">
				<TextField icon-name="uil:search" placeholder="Search for words..." />
			</form>

			<ul class="menu">
				<li
					v-for="(item, index) in categories"
					:key="index"
					:class="{ disabled: item.disabled }"
					@click="item.onClick"
				>
					<div class="grid gap-4">
						<Icon :name="item.icon" class="col-span-1" />
						<div class="col-span-9 flex flex-col">
							<span>{{ item.title }}</span>
							<span v-if="item.words">{{ item.words }} words</span>
						</div>
						<span v-if="item.progress" class="col-span-2 flex justify-end text-gray-500">
							{{ item.progress }}%
						</span>
					</div>
				</li>
			</ul>

			<hr class="my-2" />

			<ul class="menu">
				<li>
					<details :open="generalList">
						<summary>New General Service List</summary>
					</details>
				</li>
				<li>
					<details :open="oxfordList">
						<summary>Oxford 3000 & 5000</summary>
					</details>
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
