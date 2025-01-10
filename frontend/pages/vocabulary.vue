<script setup lang="ts">
	import { ref } from 'vue'

	const generalList = ref(true)
	const oxfordList = ref(true)

	const categories = [
		{ title: 'Idioms', words: 2, icon: 'uil:water', iconColor: 'amber' },
		{ title: 'IELTS', words: 17, icon: 'uil:leaf', iconColor: 'orange', progress: 6 },
		{ title: 'Linking words', words: 46, icon: 'uil:ruler', iconColor: 'orange', progress: 87 },
		{ title: 'Smart Book', words: 228, icon: 'uil:notebook', iconColor: 'blue', progress: 78 },
		{ title: 'Свои слова', words: 79, icon: 'uil:camera', iconColor: 'grey', progress: 5 },
		{ title: 'Анатомия', words: 120, icon: 'uil:bone', iconColor: 'amber', progress: 2 },
		{ title: 'Археология', words: 74, icon: 'uil:flower-tulip', iconColor: 'red' },
	]
</script>

<template>
	<div class="container">
		<div class="card m-2 shadow-lg">
			<div class="card-body flex justify-between">
				<h2 class="card-title">Vocabulary</h2>
				<button class="btn btn-link text-primary">IMPORT</button>
			</div>

			<div class="form-control px-4">
				<label class="input-group">
					<Icon name="uil:search" />
					<input type="text" placeholder="Search for words..." class="input input-bordered" />
				</label>
			</div>

			<ul class="menu">
				<li>
					<button class="btn btn-ghost flex justify-start">
						<Icon name="uil:plus" class="mr-2" />
						Add category
					</button>
				</li>
				<li v-for="(item, index) in categories" :key="index" class="flex justify-between">
					<div class="flex items-center space-x-2">
						<Icon :name="item.icon" :class="['text-' + item.iconColor]" />
						<span>{{ item.title }}</span>
						<span>{{ item.words }} words</span>
					</div>
					<span v-if="item.progress" class="text-gray-500">{{ item.progress }}%</span>
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
