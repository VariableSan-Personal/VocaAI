<script setup lang="ts">
	definePageMeta({
		title: 'Vocabulary',
	})

	const generalList = ref(true)
	const oxfordList = ref(true)

	const categories = [
		{ title: 'Idioms', words: 2, icon: 'uil:water' },
		{ title: 'Linking words', words: 46, icon: 'uil:ruler', progress: 87 },
		{ title: 'Свои слова', words: 79, icon: 'uil:camera', progress: 5 },
	]
</script>

<template>
	<div class="container">
		<div class="card m-2 shadow-lg">
			<teleport to="#headerContent">
				<button class="btn btn-link px-0 uppercase text-primary">Import</button>
			</teleport>

			<form class="form-control px-4">
				<TextField icon-name="uil:search" placeholder="Search for words..." />
			</form>

			<ul class="menu">
				<li>
					<button class="btn btn-ghost flex justify-start">
						<Icon name="uil:plus" class="mr-2" />
						Add category
					</button>
				</li>

				<li v-for="(item, index) in categories" :key="index">
					<div class="grid gap-4">
						<Icon :name="item.icon" class="col-span-1" />
						<div class="col-span-9 flex flex-col">
							<span>{{ item.title }}</span>
							<span>{{ item.words }} words</span>
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

		<button class="btn btn-primary fixed bottom-20 right-1/2 translate-x-1/2 rounded-lg">
			<Icon name="uil:plus" class="mr-1" />
			Word
		</button>
	</div>
</template>

<style scoped>
	.floating-button {
		right: calc(50% - 104px / 2);
		bottom: 80px;
	}
</style>
