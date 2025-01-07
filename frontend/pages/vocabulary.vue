<script setup lang="ts">
	import { ref } from 'vue'

	const generalList = ref(true)
	const oxfordList = ref(true)

	const categories = [
		{ title: 'Idioms', words: 2, icon: 'mdi-water', iconColor: 'amber' },
		{ title: 'IELTS', words: 17, icon: 'mdi-leaf', iconColor: 'orange', progress: 6 },
		{ title: 'Linking words', words: 46, icon: 'mdi-ruler', iconColor: 'orange', progress: 87 },
		{ title: 'Smart Book', words: 228, icon: 'mdi-notebook', iconColor: 'blue', progress: 78 },
		{ title: 'Свои слова', words: 79, icon: 'mdi-camera', iconColor: 'grey', progress: 5 },
		{ title: 'Анатомия', words: 120, icon: 'mdi-bone', iconColor: 'amber', progress: 2 },
		{ title: 'Археология', words: 74, icon: 'mdi-flower-tulip', iconColor: 'red' },
	]
</script>

<template>
	<v-container class="pa-0">
		<v-card class="mx-2">
			<v-card-title class="d-flex justify-space-between">
				Vocabulary
				<v-btn variant="text" color="primary">IMPORT</v-btn>
			</v-card-title>

			<v-text-field
				prepend-inner-icon="mdi-magnify"
				placeholder="Search for words..."
				class="rounded-pill mx-4"
				variant="outlined"
				density="comfortable"
				hide-details
			></v-text-field>

			<v-list>
				<v-list-item>
					<v-btn prepend-icon="mdi-plus" variant="text" block class="justify-start">
						Add category
					</v-btn>
				</v-list-item>

				<v-list-item v-for="(item, index) in categories" :key="index">
					<template v-slot:prepend>
						<v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
					</template>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
					<v-list-item-subtitle>{{ item.words }} words</v-list-item-subtitle>
					<template v-slot:append>
						<span v-if="item.progress" class="text-grey">{{ item.progress }}%</span>
					</template>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list>
				<v-list-group v-model="generalList">
					<template v-slot:activator="{ props }">
						<v-list-item
							v-bind="props"
							prepend-icon="mdi-book"
							title="New General Service List"
						></v-list-item>
					</template>
				</v-list-group>

				<v-list-group v-model="oxfordList">
					<template v-slot:activator="{ props }">
						<v-list-item
							v-bind="props"
							prepend-icon="mdi-book"
							title="Oxford 3000 & 5000"
						></v-list-item>
					</template>
				</v-list-group>
			</v-list>
		</v-card>

		<v-btn
			class="floating-button"
			color="primary"
			prepend-icon="mdi-plus"
			position="fixed"
			rounded="lg"
		>
			Word
		</v-btn>
	</v-container>
</template>

<style scoped>
	.floating-button {
		right: calc(50% - 104px / 2);
		bottom: 80px;
	}
</style>
